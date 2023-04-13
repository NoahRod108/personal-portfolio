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

