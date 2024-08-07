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

        videoJsResolutionSwitcher : {
            default : 'high',
            dynamicLabel : true
        }
    }
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

        // you must load the video

    }catch(err){
        alert('An error occurred while getting the data from server.\nPlease check you connection and make sure you are connected via a VPN.')
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
    
    res.items.forEach(async file => {
        fileType = file.name.split('.')[1]

        if(fileType === 'srt' || fileType === 'vvt'){
            files.subtitles.push({file, type : fileType})
        }else{
            files.videos.push({file, type : fileType})
        }
    })

    return files
}

window.addEventListener('load', loadData)