const words = [
    "web dizajner",
    "2D animator",
    "grafički dizajner"
];

let wordIndex = 0;
let charIndex = 0;
let typingSpeed = 100;     // brzina kucanja
let eraseSpeed = 70;       // brzina brisanja
let delayBetweenWords = 10000; // 10 sekundi stajanja

const typingSpan = document.getElementById("typing");

function type() {
    if (charIndex < words[wordIndex].length) {
        typingSpan.textContent += words[wordIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingSpeed);
    } else {
        setTimeout(erase, delayBetweenWords);
    }
}

function erase() {
    if (charIndex > 0) {
        typingSpan.textContent = words[wordIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, eraseSpeed);
    } else {
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    type();
});