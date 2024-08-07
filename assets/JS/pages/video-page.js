import { collection, query, where, db, getDocs, ref, storage, listAll, getDownloadURL } from "../../Packages/Firebase/firebase.js"

const $ = document
const video = document.getElementById('video')
const locationParams = new URLSearchParams(location.search)
const seriesId = locationParams.get('id')
const title = $.querySelector('h1')
const imagePreview = $.getElementById('imagePreview')
const genresWrapper = $.getElementById('genres')
const date = $.querySelector('.date')
const time = $.querySelector('.time')
const rating = $.querySelector('.rating')
const description = $.querySelector('.video-description')
const country = $.getElementById('country')
const dateRelease = $.getElementById('dateRelease')
const production = $.getElementById('production')
const casts = $.getElementById('casts')


const videoJSConfigs = {
    controls : true,
    playbackRates : [0.5, 1, 1.25, 1.5, 2, 4],
    inactivityTimeout : 3000,
    plugins : {
        hotkeys : {
            volumeStep : 0.1,
            seekStep : 5,
        },
    },
    controlBar: {
        children: [
           'playToggle',
           'volumePanel',
           'currentTimeDisplay',
           'timeDivider',
           'durationDisplay',
           'progressControl',
           'playbackRateMenuButton',
           'qualitySelector',
           'subsCapsButton',
           'pictureInPictureToggle',
           'fullscreenToggle',
        ],
    },
}

const player = videojs(video, videoJSConfigs)


async function loadData() {
    try{ 
        const episode = await getData()
        const files = await getFiles()

        title.textContent = episode.title
        rating.textContent = episode.rating
        description.textContent = episode.description
        country.textContent = episode.country
        dateRelease.textContent = episode.dateRelease
        production.textContent = episode.producer
        imagePreview.src = episode.imageURL
        date.textContent = episode.dateRelease.split('/')[0]
        episode.genres.forEach(genre => genresWrapper.innerHTML += `<a href="#">${genre}</a>`)
        episode.casts.forEach(cast => casts.innerHTML += cast + ', ')
        player.poster(episode.videoPoster)

        const videoPromises = files.videos.map(async video => {
            const downloadUrl = await getDownloadURL(video.ref)
            return{
                src : downloadUrl,
                type : `video/${video.type}`,
                label : video.quality + 'p',
            }
        })

        const subtitlePromises = files.subtitles.map(async subtitle => {
            const downloadUrl = await getDownloadURL(subtitle.ref)
            return{
                src : downloadUrl,
                kind : 'subtitles',
                srclang : subtitle.lang,
                label : subtitle.lang
            }
        })

        const subtitleSources = await Promise.all(subtitlePromises)
        const videoSources = await Promise.all(videoPromises)

        player.src(videoSources)
        subtitleSources.forEach(subtitle => {
            player.addRemoteTextTrack(subtitle, true)
        })

        player.on('loadedmetadata', ()=> {
            const hours = Math.floor(player.duration() / 3600)
            const minutes = Math.floor((player.duration() % 3600) / 60)
            const seconds = Math.floor(player.duration() % 60)

            const hourFormat = hours > 0 ? hours + ':' : ''
            const minutesFormat = minutes < 10 ? '0' + minutes : minutes
            const secondsFormat = seconds < 10 ? '0' + seconds : seconds

            time.textContent = `${hourFormat, minutesFormat}:${secondsFormat}`
        })

    }catch(err){
        alert('An error occurrged while getting the data from server.\nPlease check you connection and make sure you are connected via a VPN.')
        console.log(err);
    }
}


async function getData () {
    const seriesRef = query(collection(db, 'series'), where('seriesID', '==', seriesId))
    const querySnapshot = await getDocs(seriesRef)

    if(querySnapshot.empty){
        alert('404 Error, the series dose not exist')
        history.back()
        return
    }

    return querySnapshot.docs[0].data()
}

async function getFiles () {
    const folderRef = ref(storage, `series/${seriesId}/season1/episode1`)
    const res = await listAll(folderRef)
    const files = {videos : [], subtitles : []}
    let fileType
    let fileInfo
 
    res.items.forEach(async fileRef => {
        fileType = fileRef.name.split('.')[1]
        fileInfo = fileRef.name.split('-')[1].split('.')[0].trim()
        if(fileType === 'vtt'){
           files.subtitles.push({ref : fileRef, type : fileType, lang: fileInfo})
        }else{
            files.videos.push({ref : fileRef, type : fileType, quality : fileInfo})
        }
    })

    return files
}

window.addEventListener('load', loadData)