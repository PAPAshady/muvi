import { db, collection, getDocs } from "../../Packages/Firebase/firebase.js"

const $ = document
const sliderElem = $.querySelector('.slider-banner')
const recommendedWrapper = $.getElementById('recommendedWrapper')


// Swiper js initialization
const swiper = new Swiper(sliderElem, {
    
    loop : true,

    autoplay : {
        delay : 5000,
    },

    pagination : {
        el : '.swiper-pagination',
        type : 'bullets',
        clickable : true,
        enabled : false
    },

    breakpoints : {
        768: {
            pagination : {
                enabled : true
            }
        }
    }
})


async function getAllSeries () {
    try{
        const allSeries = []
        const querySnapshot = await getDocs(collection(db, 'series'))
        querySnapshot.forEach(doc => allSeries.push(doc.data()))
        return allSeries
    }catch(err){
        alert('An error occurred while getting the data from server.\nPlease refresh the page and try again')
        console.log(err);
    }
}

function renderSeries(seriesArr, containerElem) {
    containerElem.innerHTML = ''
    console.log(containerElem);
    const allSeries = seriesArr.map(series => (
        `<div class="media-card">
            <a href="/video-page.html?id=${series.seriesID}">
                <img loading="lazy" src="${series.imageURL}" alt="${series.title}">
            </a>
            <div class="media-info">
                <a href="/video-page.html?id=${series.seriesID}">${series.title}</a>
                <div class="btn-wrapper">
                    <button class="btn-fill">HD</button>
                </div>
            </div>
        </div>`
    )).join('')

    containerElem.insertAdjacentHTML('beforeend', allSeries)
}

window.addEventListener("load", async () => renderSeries(await getAllSeries(), recommendedWrapper))

