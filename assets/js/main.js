'use strict';

// --- Common Helper Functions & Math Constants ---
// These are defined globally for use by any of the dynamically loaded animation scripts.

const TO_RAD = Math.PI / 180;
const TAU = Math.PI * 2;
const HALF_PI = Math.PI / 2;
const cos = Math.cos;
const sin = Math.sin;

function rand(range) {
    return Math.random() * range;
}

function round(value) {
    return Math.round(value);
}

function fadeInOut(life, ttl) {
    // This function should return a value between 0 and 1
    // for opacity, peaking at life = ttl / 2.
    const progress = life / ttl;
    return Math.sin(progress * Math.PI);
}

function lerp(a, b, t) {
    return a + (b - a) * t;
}

function randRange(range) {
    // Returns a random number between -range and +range, centered around 0.
    // Useful for variations like `centerPoint + randRange(offset)`
    return (Math.random() - 0.5) * 2 * range;
}
// SimplexNoise is assumed to be loaded globally via a separate script tag (e.g., CDN) in the HTML.

document.addEventListener('DOMContentLoaded', () => {

    // --- Randomly Load Background Animation Script ---
    const animationScripts = [
        'assets/js/aurora.js',
        'assets/js/pipeline.js',
        'assets/js/shift.js',
        'assets/js/swirl.js'
    ];
    const randomIndex = Math.floor(Math.random() * animationScripts.length);
    const scriptToLoad = animationScripts[randomIndex];

    if (scriptToLoad) {
        const scriptElement = document.createElement('script');
        scriptElement.src = scriptToLoad;
        // scriptElement.async = true; // Default for dynamically added scripts
        document.head.appendChild(scriptElement); // Append to head to load and execute
        // console.log(`Loading animation: ${scriptToLoad}`);
    }

    // Intersection Observer for Animations
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
});