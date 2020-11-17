// This is Dreta's website. Hmm...
// Copyright (C) 2020 Dreta
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Please don't look at this. This is ugly AF.

const display1 = document.getElementById("display-1");
const display2 = document.getElementById("display-2");
const text = document.getElementById("text");
const otherText = document.getElementById("other-text");
const descText = document.getElementById("description-text");
const audio = document.getElementById("audio");

let initialized = false;

function initialize() {
    display1.style.animationName = "fade-out";
    display1.style.animationDuration = "200ms";
    display1.style.animationTimingFunction = "ease-in";
    display1.style.animationPlayState = "running";

    setTimeout(() => {
        // This will be called after the initial fade out finishes.
        display1.remove();
        display2.style.display = "flex";
        display2.style.animationName = "fade-in";
        display2.style.animationDuration = "200ms";
        display2.style.animationTimingFunction = "ease-out";
        display2.style.animationPlayState = "running";
        display2.style.opacity = "1";
        text.style.animationPlayState = "running";
        audio.play();

        setTimeout(() => {
            // This will be called after the title animation finishes.
            otherText.style.opacity = "1";
            otherText.style.animationName = "fade-in";
            otherText.style.animationDuration = "500ms";
            otherText.style.animationTimingFunction = "ease-out";
            otherText.style.animationPlayState = "running";
        }, 1700);
    }, 200);

    let blur = 20;
    const interval = setInterval(() => {
        if (blur === 0) {
            clearInterval(interval);
            return;
        }
        blur--;
        document.querySelector("body").style.backdropFilter = "blur(" + blur + "px)";
    }, 10);
    initialized = true;
}

function handleClick() {
    if (!initialized) {
        initialize();
        return;
    }
    if (clicking) {
        return;
    }
    clicking = true;
    current++;
    if (current === messages.length) {
        current = 0;
    }
    descText.style.animationName = "fade-out";
    descText.style.animationDuration = "100ms";
    descText.style.animationTimingFunction = "ease-in";
    descText.style.animationPlayState = "running";
    setTimeout(() => {
        descText.innerHTML = messages[current];
        descText.style.animationName = "fade-in";
        descText.style.animationDuration = "100ms";
        descText.style.animationTimingFunction = "ease-out";
        descText.style.animationPlayState = "running";
        clicking = false;
    }, 100);
}

window.onkeyup = e => {
    if (!initialized && e.key === " ") {
        initialize();
    } else if (initialized && (e.key === "Enter" || e.key === " ")) {
        handleClick();
    }
};

const messages = [
    "Stay-at-home Developer",
    "Great at team-working and communicating",
    "Offering:",
    "Minecraft full server setup (not including hosting)",
    "Customized Discord bot (not including hosting)",
    "Discord server setup",
    "Doing:",
    "Working on <a href=\"https://github.com/Spock-App\" title=\"Spock\">Spock</a>",
    "Learning <a href=\"https://www.coursera.org/learn/nand2tetris2\">nand2tetris Part 2</a>",
    "Please add me on Discord if interested"
];

let current = 0;
let clicking = false;

window.onclick = handleClick;
