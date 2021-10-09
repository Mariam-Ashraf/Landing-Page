/**
 * Define Global Variables
 * 
 */

const sections = document.querySelectorAll('section');

const fragment = document.createDocumentFragment();

const list = document.querySelector('#navbar__list');


/**
 * End Global Variables
 * Start Helper Functions
 * 
 */

/**
 * @description Observes the sections to change the state of menu item.
 * @constructor
 * @param
 */

function toggleActiveState() {
    let observer = new IntersectionObserver(function(entries, observer) {

        entries.forEach(entry => {

            // Set sections as active
            if (entry.isIntersecting) {
                entry.target.classList.add("your-active-class");

                // Remove the active state for non-active sections
                for (let j = 0; j < links.length; j++) {
                    let link = document.getElementById("sec" + (j + 1));
                    link.classList.remove("active-item");
                }

                // Toggle the state of the active section.
                let selectedLink = document.getElementById((entry.target.getAttribute('id')).substr(0, 3).concat((entry.target.getAttribute('id')).substr(7, 6)));
                selectedLink.classList.add("active-item");
            }

        }, { root: null, threshold: 1, rootMarign: "-150px" });
    });

    // Observe sections
    for (let i = 0; i < sections.length; i++) {
        observer.observe(sections[i]);
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

// Build the nav menu
for (let i = 0; i < sections.length; i++) {
    // Create new list item for every section
    let newNavItem = document.createElement('li');

    // Set class name and id for the item
    newNavItem.setAttribute('class', 'section' + (i + 1));
    newNavItem.setAttribute('id', 'item' + (i + 1));

    // Create link from menu item to the related section
    let a = document.createElement('a');
    a.innerText = sections[i].getAttribute('data-nav');
    a.href = "#" + sections[i].getAttribute('id');
    a.setAttribute('id', 'sec' + (i + 1));
    a.setAttribute('class', 'menu__link');

    // Append the item in menu to the page
    newNavItem.appendChild(a);
    fragment.appendChild(newNavItem);
}

// Append the menu to the page
list.appendChild(fragment);

/**
 * End Main Functions
 * Begin Events
 * 
 */

let items = document.querySelectorAll('li');

let links = document.querySelectorAll('a');

// Scroll to section on mouse scroll
window.addEventListener('scroll', toggleActiveState());

// Scroll to section on link click
for (let i = 1; i <= sections.length; i++) {
    let navLink = document.getElementById("sec" + i);

    // Scroll to anchor ID using scrollTO event
    navLink.addEventListener('click', function scrollToSection(event) {
        for (let j = 0; j < links.length; j++) {
            let link = document.getElementById("sec" + (j + 1));
            link.classList.remove("active-item");
        }

        event.preventDefault();

        let selectedSection = document.getElementById(
            (navLink.getAttribute('href').replace("#", "")));

        // Add class 'active' to section when near top of viewport
        event.target.classList.add("active-item");

        selectedSection.scrollIntoView({ behavior: "smooth", block: "center" });
    });
}