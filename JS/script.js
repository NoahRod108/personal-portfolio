const terminalButtons = document.querySelectorAll(".terminal-buttons a");
const activeTerminalButton = document.getElementsByClassName("active");
const activeChevron = document.getElementsByClassName("active-selector-selected");
const navItems = document.querySelector(".nav-items");
const hero = document.querySelector(".hero");
const menuToggle = document.querySelector(".menu-toggle");
const sections = document.querySelectorAll("section")
let current = 0;

// handle scroll to top
window.scroll(function() {
    var scroll = window.scrollTo(top);
    hero.classList.add({
      transform: 'translate3d(0, +'+(scroll/100)+'%, 0) scale('+(100 - scroll/100)/100+')'
    });
  });

// handle scroll animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }else{
            entry.target.classList.remove('show');
        }
    })
})

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => {
    observer.observe(el);
})

// handle smooth scroll
const navScroll = (id) => {
    const navItem = document.getElementById(id);
    navItem.scrollIntoView({behavior: 'smooth'});
}

// mobile menu
const openMenu = () =>{
    menuToggle.classList.contains('toggled') ? menuToggle.classList.remove('toggled') : menuToggle.classList.add('toggled');
}

// handle terminal interaction for active links
const handleKeyPress = (e) => {
    const {keyCode} = e;

    if(keyCode === 39){
        terminalButtons[current].classList.remove("active");
        current = current < terminalButtons.length - 1 ? ++current : terminalButtons.length - 1;

        terminalButtons[current].classList.add("active");
    }

    if(keyCode === 37){
        terminalButtons[current].classList.remove("active");
        current = current > 0 ? --current : 0;

        terminalButtons[current].classList.add("active");
    }

    if(keyCode === 13 && !e.target.classList.contains("contact-fields")){
        e.preventDefault();
        const navItem = document.getElementById(activeTerminalButton[0].name);
        navItem.scrollIntoView({behavior: 'smooth'});
    }
}

const handleMouseOver = (e) => {
    let terminalButton = e.target;
    console.log(terminalButton)

    if(terminalButton.classList.contains('terminal-btn')){
        activeTerminalButton[0].classList.remove("active");

        terminalButton.classList.add("active");
    }
    
}

const handleMouseOut = (e) => {
    let terminalButton = e.target;

    if(terminalButton.classList.contains('terminal-btn')){
        activeTerminalButton[0].classList.remove("active");
    
        terminalButtons[0].classList.add("active");
    }
}

// handle hamburger menu
const handleToggle = () =>{
    const visible = navItems.getAttribute('data-visible');

    if(visible === "false"){
        navItems.setAttribute('data-visible', true);
        menuToggle.setAttribute('aria-expanded', true)
    }else{
        navItems.setAttribute('data-visible', false);
        menuToggle.setAttribute('aria-expanded', false)
    }
}

document.addEventListener("keydown", handleKeyPress);
// menuToggle.addEventListener('click', handleToggle);
document.addEventListener('mouseover', handleMouseOver);
document.addEventListener('mouseout', handleMouseOut);