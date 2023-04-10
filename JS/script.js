// const terminalButtons = document.querySelectorAll(".terminal-buttons a");
// const activeTerminalButton = document.getElementsByClassName("active");
// const activeChevron = document.getElementsByClassName("active-selector-selected");
// const navItems = document.querySelector(".nav-items");
// const hero = document.querySelector(".hero");
// const menuToggle = document.querySelector(".menu-toggle");
// const sections = document.querySelectorAll("section")
// let current = 0;

// // handle scroll to top
// window.scroll(function() {
//     var scroll = window.scrollTo(top);
//     hero.classList.add({
//       transform: 'translate3d(0, +'+(scroll/100)+'%, 0) scale('+(100 - scroll/100)/100+')'
//     });
//   });

// // handle scroll animation
// const observer = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//         if(entry.isIntersecting){
//             entry.target.classList.add('show');
//         }else{
//             entry.target.classList.remove('show');
//         }
//     })
// })

// const hiddenElements = document.querySelectorAll('.hidden');
// hiddenElements.forEach((el) => {
//     observer.observe(el);
// })

// // handle smooth scroll
// const navScroll = (id) => {
//     const navItem = document.getElementById(id);
//     navItem.scrollIntoView({behavior: 'smooth'});
// }

// // mobile menu
// const openMenu = () =>{
//     menuToggle.classList.contains('toggled') ? menuToggle.classList.remove('toggled') : menuToggle.classList.add('toggled');
// }

// // handle terminal interaction for active links
// const handleKeyPress = (e) => {
//     const {keyCode} = e;

//     if(keyCode === 39){
//         terminalButtons[current].classList.remove("active");
//         current = current < terminalButtons.length - 1 ? ++current : terminalButtons.length - 1;

//         terminalButtons[current].classList.add("active");
//     }

//     if(keyCode === 37){
//         terminalButtons[current].classList.remove("active");
//         current = current > 0 ? --current : 0;

//         terminalButtons[current].classList.add("active");
//     }

//     if(keyCode === 13 && !e.target.classList.contains("contact-fields")){
//         e.preventDefault();
//         const navItem = document.getElementById(activeTerminalButton[0].name);
//         navItem.scrollIntoView({behavior: 'smooth'});
//     }
// }

// const handleMouseOver = (e) => {
//     let terminalButton = e.target;
//     console.log(terminalButton)

//     if(terminalButton.classList.contains('terminal-btn')){
//         activeTerminalButton[0].classList.remove("active");

//         terminalButton.classList.add("active");
//     }
    
// }

// const handleMouseOut = (e) => {
//     let terminalButton = e.target;

//     if(terminalButton.classList.contains('terminal-btn')){
//         activeTerminalButton[0].classList.remove("active");
    
//         terminalButtons[0].classList.add("active");
//     }
// }

// // handle hamburger menu
// const handleToggle = () =>{
//     const visible = navItems.getAttribute('data-visible');

//     if(visible === "false"){
//         navItems.setAttribute('data-visible', true);
//         menuToggle.setAttribute('aria-expanded', true)
//     }else{
//         navItems.setAttribute('data-visible', false);
//         menuToggle.setAttribute('aria-expanded', false)
//     }
// }

// document.addEventListener("keydown", handleKeyPress);
// // menuToggle.addEventListener('click', handleToggle);
// document.addEventListener('mouseover', handleMouseOver);
// document.addEventListener('mouseout', handleMouseOut);

const mobileNav = document.querySelector(".mobile-nav");
const navbar = document.querySelector(".navbar");
const header = document.querySelector(".header");
const textHacked = document.querySelectorAll("[data-hacked]");
const projectNames = document.querySelector(".project-list");
const projectCards = document.querySelectorAll(".project-card");
const nameTitle = document.querySelector("[data-title-hacked]");
const letters = "D>GIJK<M123456789NOQR/TUVWXYZ#@*+&%!";
const letters2 = ["Front-end Developer","Back-end Developer_"];
let devloperHeading = 0;

let interval = null;

mobileNav.addEventListener('click', () =>{
    // check and toggle attributes for mobile menu
    navbar.hasAttribute("data-visible") ? mobileNav.setAttribute("aria-expanded", false) : mobileNav.setAttribute("aria-expanded", true);
    navbar.toggleAttribute("data-visible");
    header.toggleAttribute("data-overlay");
});

projectNames.addEventListener('click', (e) =>{
    // find project selected and display correct card
    let selected = e.target;

    // toggled correct card when clicked
    projectCards.forEach((card) =>{
        // toggle attribute if toggled
        if(card.hasAttribute("data-visible")) card.toggleAttribute("data-visible");

        if(card.dataset.value === selected.dataset.projectName){
            card.toggleAttribute("data-visible");
        }
    });
});

// letter effects
textHacked.forEach(scrambleText);
changeHeading();

// FUNCTIONS
function scrambleText(item){
    item.onmouseover = event => {
        let iteration = 0;
        
        clearInterval(interval);
        
        interval = setInterval(() => {
            // split word
            event.target.innerText = event.target.innerText.split("").map((letter, index) => {
                // change back to normal 1 character at a time
                if(index < iteration) {
                    return event.target.dataset.value[index];
                }
                
                // randomize character list
                return letters[Math.floor(Math.random() * 26)]
            }).join("");
            
            if(iteration >= event.target.dataset.value.length){ 
                clearInterval(interval);
            }
            
            iteration += 1 / 3;
        }, 30);
    }
}

// basically the same as the mouse over but uses an array to switch words for the heading on a timer
function changeHeading(){
    scrambleHeading(devloperHeading);
    devloperHeading < letters2.length - 1 ? devloperHeading += 1 : devloperHeading = 0;

    setTimeout(() => {
        changeHeading();
    }, 5000);
}

// animation for hero section heading
function scrambleHeading(role){
    nameTitle.setAttribute("data-value", letters2[role]);
    
    let item = nameTitle;
    let iteration = 0;
    
    clearInterval(interval);

    interval = setInterval(() => {
        // split word
        item.innerText = item.innerText.split("").map((letter, index) => {
            // change back to normal 1 character at a time
            if(index < iteration) {
                return item.dataset.value[index];
            }

            // randomize character list
            return letters[Math.floor(Math.random() * 26)];
        }).join("");

        if(iteration >= nameTitle.dataset.value.length){ 
            clearInterval(interval);
        }
        
        iteration += 1;
    }, 30);
}

