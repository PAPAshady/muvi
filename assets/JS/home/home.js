const $ = document
const sliderElem = $.querySelector('.slider-banner')
const openMenuBtn = $.getElementById('openMenuBtn')
const mobileMenuWrapper = $.querySelector('.mobile-menu-wrapper')
const mainContentElem = $.querySelector('.main-content')
const closeMobileMenuBtn = $.getElementById('closeMobileMenuBtn')


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

function closeMobileMenu () {
    mainContentElem.classList.remove('active-menu')
    mobileMenuWrapper.classList.remove('active-menu')
}

// open mobile menu
openMenuBtn.addEventListener('click', () => {
    mainContentElem.classList.add('active-menu')
    mobileMenuWrapper.classList.add('active-menu')
})

// close mobile menu by close button
closeMobileMenuBtn.addEventListener('click', closeMobileMenu)

// close mobile menu by clicking outside of menu
mobileMenuWrapper.addEventListener('click', e => {
    if(e.target.classList.contains('mobile-menu-wrapper')){
        closeMobileMenu()
    }
})