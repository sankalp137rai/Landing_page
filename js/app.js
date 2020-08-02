/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/


/**
 * Define Global Variables
 * 
*/
const orderedList = document.getElementById('navbar__list');
const sections = document.getElementsByTagName('section');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
// build the nav
function buildNav(){
    let fragment = document.createDocumentFragment();
    for(let i=0;i<sections.length;i++){
        const newListItem = document.createElement('li');
        const newAnchor = document.createElement('a');
        const listClasses = newAnchor.classList;
        listClasses.add("menu__link");
        newAnchor.textContent = sections[i].getAttribute("data-nav");
        newAnchor.setAttribute("href", "#"+sections[i].getAttribute("id"));
        newListItem.appendChild(newAnchor);
        fragment.appendChild(newListItem);
    }
    orderedList.appendChild(fragment);
}


function getActiveElem() {
    maxSection = sections[0];
    minVal = 1000000;
    for (item of sections) {
        let bounding = item.getBoundingClientRect();
        if (bounding.top > -300 & bounding.top < minVal) {
            minVal = bounding.top;
            maxSection = item;
        };
    };
    return maxSection;
};

// Add class 'active' to section when near top of viewport
function setActive () {
    window.addEventListener('scroll', function (event) {
        let section = getActiveElem();
        section.classList.add('your-active-class');
        // set other sections as inactive
        for (let item of sections) {
            if (item.id != section.id & item.classList.contains('your-active-class')) {
                item.classList.remove('your-active-class');
            }
        }
    });
};

// Scroll to anchor ID using scrollTO event
function scroll(){
    $('.navbar__menu a').on('click', function (e) {
    if (this.hash !== '') {
        e.preventDefault();

        const hash = this.hash;

        $('html, body')
        .animate({
            scrollTop: $(hash).offset().top
        }, 500);
    }
    });
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNav();

// Scroll to section on link click
scroll();

// Set sections as active
setActive();