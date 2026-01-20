// Typing animation words
const typingWords = [
    "web dizajner",
    "2D animator",
    "grafički dizajner"
];

let currentWordIndex = 0;
let currentCharIndex = 0;
let typingSpeed = 100;     // brzina kucanja
let eraseSpeed = 70;       // brzina brisanja
let delayBetweenWords = 3000; // 3 sekunde stajanja

const typingSpan = document.getElementById("typing");

function typeWord() {
    if (currentCharIndex < typingWords[currentWordIndex].length) {
        typingSpan.textContent += typingWords[currentWordIndex].charAt(currentCharIndex);
        currentCharIndex++;
        setTimeout(typeWord, typingSpeed);
    } else {
        setTimeout(eraseWord, delayBetweenWords);
    }
}

function eraseWord() {
    if (currentCharIndex > 0) {
        typingSpan.textContent = typingWords[currentWordIndex].substring(0, currentCharIndex - 1);
        currentCharIndex--;
        setTimeout(eraseWord, eraseSpeed);
    } else {
        currentWordIndex = (currentWordIndex + 1) % typingWords.length;
        setTimeout(typeWord, 500);
    }
}

// Hamburger menu toggle
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

function toggleMenu() {
    navMenu.classList.toggle("active");
}

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", toggleMenu);
}

// Close menu when clicking on a link
const navLinks = document.querySelectorAll(".nav-menu a");
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });
});

// Initialize typing animation when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    typeWord();
});
