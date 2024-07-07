const $ = document
const openMenuBtn = $.getElementById('openMenuBtn')
const mobileMenuWrapper = $.querySelector('.mobile-menu-wrapper')
const mainContentElem = $.querySelector('.main-content')
const closeMobileMenuBtn = $.getElementById('closeMobileMenuBtn')

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
