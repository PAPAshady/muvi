const $ = document
const sliderElem = $.querySelector('.slider-banner')

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