// Copyright (C) 2020 Dreta. All rights reserved.

const about = document.getElementById("about");
const exp = document.getElementById("experiences");
const services = document.getElementById("services");
const footer = document.getElementById("footer");
const aboutLink = document.getElementById("about-link");
const expLink = document.getElementById("exp-link");
const servicesLink = document.getElementById("services-link");
const contactLink = document.getElementById("contact-link");
const a = document.getElementById("a");

// Scrollspy

function isVisible(e) {
    if (e == null) {
        return;
    }

    let rect = e.getBoundingClientRect();
    let viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}

function handleScroll() {
    for (let link of document.querySelectorAll(".nav-link")) {
        link.classList.remove("blue-gradient");
    }
    // Order matters
    if (isVisible(about)) {
        aboutLink.classList.add("blue-gradient");
        return;
    }
    if (isVisible(exp)) {
        expLink.classList.add("blue-gradient");
        return;
    }
    if (isVisible(footer)) { // If the footer is visible then the contacts must be visible.
        // Because checking contact's visibility before service's can cause inaccurate results.
        contactLink.classList.add("blue-gradient");
        return;
    }
    if (isVisible(services)) {
        servicesLink.classList.add("blue-gradient");
    }
}

window.onscroll = handleScroll;


handleScroll();

// Typewriter

const txt = [
    "fun",
    "fast",
    "ardent",
    "skillful",
    "young",
    "fair"
];
const typewriter = document.getElementById("typewriter");
const cursor = document.getElementById("cursor");
let i = 0;
let j = 0;
let cursorShown = true;

function updateTypewriter(text) {
    if (text.startsWith("a") || text.startsWith("e") || text.startsWith("i") || text.startsWith("o") || text.startsWith("u")) {
        a.innerText = "an";
    } else {
        a.innerText = "a";
    }
    if (i < text.length) {
        typewriter.innerText += text.charAt(i);
        i++;
        setTimeout(() => updateTypewriter(text), 150);
    } else {
        setTimeout(() => {
            let interval = setInterval(() => {
                if (i !== 0) {
                    typewriter.innerText = typewriter.innerText.substr(0, i - 1);
                    i--;
                } else {
                    clearInterval(interval);
                    j++;
                    updateTypewriter(txt[j % txt.length]);
                }
            }, 150);
        }, 2000);
    }
}

updateTypewriter(txt[j]);
setInterval(() => {
    if (cursorShown) {
        cursor.style.borderRight = "1px solid transparent";
    } else {
        cursor.style.borderRight = "1px solid black";
    }
    cursorShown = !cursorShown;
}, 1000);

// Discord / Email
const discord = document.getElementById("discord");
const copyStatus = document.getElementById("copy-status");
let copying = false;

function updateCopyStatus() {
    if (copying) {
        return;
    }
    // I hope setTimeout can be a Promise
    copying = true;
    copyStatus.classList.add("text-green-500");
    copyStatus.style.animationName = "fade-out";
    copyStatus.style.animationDuration = "100ms";
    copyStatus.style.animationPlayState = "running";
    setTimeout(() => {
        copyStatus.innerText = "Copied!";
        copyStatus.style.animationName = "fade-in";
        copyStatus.style.animationDuration = "100ms";
        copyStatus.style.animationPlayState = "running";
        setTimeout(() => {
            copyStatus.style.animationName = "fade-out";
            copyStatus.style.animationDuration = "100ms";
            copyStatus.style.animationPlayState = "running";
            setTimeout(() => {
                copyStatus.classList.remove("text-green-500");
                copyStatus.innerText = "Ready to get in touch?";
                copyStatus.style.animationName = "fade-in";
                copyStatus.style.animationDuration = "100ms";
                copyStatus.style.animationPlayState = "running";
                setTimeout(() => {
                    copying = false;
                }, 100);
            }, 100);
        }, 1100);
    }, 100);
}

discord.onclick = () => {
    navigator.clipboard.writeText("Dreta#6665");
    updateCopyStatus();
};
discord.onkeyup = () => {
    navigator.clipboard.writeText("Dreta#6665");
    updateCopyStatus();
};
discord.ontouchend = () => {
    navigator.clipboard.writeText("Dreta#6665");
    updateCopyStatus();
};
