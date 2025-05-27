'use strict';

// Helper functions (as they are not standard JS)
function rand(range) {
    return Math.random() * range;
}

function round(value) {
    return Math.round(value);
}

function fadeInOut(life, ttl) {
    // This function should return a value between 0 and 1
    // for opacity, peaking at life = ttl / 2.
    // Math.sin(progress * Math.PI) is a good choice.
    const progress = life / ttl;
    return Math.sin(progress * Math.PI);
}

const rayCount = 500;
const rayPropCount = 8;
const rayPropsLength = rayCount * rayPropCount;
const baseLength = 200;
const rangeLength = 200;
const baseSpeed = 0.05;
const rangeSpeed = 0.1;
const baseWidth = 10;
const rangeWidth = 20;
const baseHue = 120;
const rangeHue = 60;
const baseTTL = 50;
const rangeTTL = 100;
const noiseStrength = 100;
const xOff = 0.0015;
const yOff = 0.0015;
const zOff = 0.0015;
const backgroundColor = 'hsla(220,60%,3%,1)';

// Color transition settings
const colorSpeed = 0.1; // Speed of color change (lower = slower)

let container;
let canvas;
let ctx;
let center;
let tick;
let simplex; // This will be an instance of SimplexNoise
let rayProps;

function setup() {
    createCanvas();
    resize(); // Call resize after creating canvas elements
    initRays();
    draw();
} function initRays() {
    tick = 0;
    // Initialize SimplexNoise with the constructor from the CDN version
    simplex = new SimplexNoise();
    rayProps = new Float32Array(rayPropsLength);

    for (let i = 0; i < rayPropsLength; i += rayPropCount) {
        initRay(i);
    }
}

function initRay(i) {
    let length, x, y1, y2, n, life, ttl, width, speed, hue; length = baseLength + rand(rangeLength);
    x = rand(canvas.a.width);
    y1 = canvas.a.height * 0.4 + noiseStrength; // Start rays from 40% from top
    y2 = y1 - length; // End rays above start point

    // Apply simplex noise to y1 and y2 for wavy effect
    // Use noise2D instead of noise3D for the CDN version of SimplexNoise
    n = simplex.noise2D(x * xOff, tick * zOff) * noiseStrength;
    y1 += n;
    y2 += n;

    life = 0;
    ttl = baseTTL + rand(rangeTTL);
    width = baseWidth + rand(rangeWidth); speed = baseSpeed + rand(rangeSpeed) * (round(rand(1)) ? 1 : -1); // Random direction

    // Use the current global hue for all rays
    hue = (baseHue + tick * colorSpeed) % 360;

    rayProps.set([x, y1, y2, life, ttl, width, speed, hue], i);
}

function drawRays() {
    for (let i = 0; i < rayPropsLength; i += rayPropCount) {
        updateRay(i);
    }
}

function updateRay(i) {
    let i2 = 1 + i, i3 = 2 + i, i4 = 3 + i, i5 = 4 + i, i6 = 5 + i, i7 = 6 + i, i8 = 7 + i;
    let x, y1, y2, life, ttl, width, speed, hue;

    x = rayProps[i];
    y1 = rayProps[i2];
    y2 = rayProps[i3];
    life = rayProps[i4];
    ttl = rayProps[i5];
    width = rayProps[i6];
    speed = rayProps[i7];
    hue = rayProps[i8];

    drawRay(x, y1, y2, life, ttl, width, hue);

    x += speed;
    life++;

    // Update y positions based on noise for continuous animation (optional, can be intensive)
    // let n = simplex.noise2D(x * xOff, tick * zOff) * (noiseStrength / 10); // smaller continuous noise
    // y1 += n;
    // y2 += n;
    // rayProps[i2] = y1;
    // rayProps[i3] = y2;


    rayProps[i] = x;
    rayProps[i4] = life;

    if (checkBounds(x) || life > ttl) {
        initRay(i);
    }
}

function render() {
    if (!ctx || !ctx.b || !ctx.a) return;
    ctx.b.save();
    // The blur and lighter composite operation create the glowing/overlapping effect            ctx.b.filter = 'blur(12px)'; // Slightly reduced blur for more definition
    ctx.b.globalCompositeOperation = 'screen'; // Changed to screen for softer blending
    ctx.b.drawImage(canvas.a, 0, 0);
    ctx.b.restore();

    // Draw again with less blur for subtle definition
    ctx.b.save();
    ctx.b.filter = 'blur(4px)';
    ctx.b.globalCompositeOperation = 'lighter';
    ctx.b.globalAlpha = 0.5; // Reduced opacity for the sharp layer
    ctx.b.drawImage(canvas.a, 0, 0);
    ctx.b.restore();
}

function drawRay(x, y1, y2, life, ttl, width, hue) {
    let gradient; gradient = ctx.a.createLinearGradient(x, y1, x, y2);
    gradient.addColorStop(0, `hsla(${hue},90%,50%,0)`); // Darker edges
    gradient.addColorStop(0.5, `hsla(${hue},95%,60%,${fadeInOut(life, ttl) * 0.5})`); // More transparent center
    gradient.addColorStop(1, `hsla(${hue},90%,50%,0)`);

    ctx.a.save();
    ctx.a.beginPath();
    ctx.a.strokeStyle = gradient;
    ctx.a.lineWidth = width;
    ctx.a.moveTo(x, y1);
    ctx.a.lineTo(x, y2);
    ctx.a.stroke();
    ctx.a.closePath();
    ctx.a.restore();
}

function checkBounds(x) {
    return x < -rangeWidth || x > canvas.a.width + rangeWidth; // Check with width offset
}

function createCanvas() {
    container = document.querySelector('.content--canvas');
    if (!container) {
        console.error("'.content--canvas' container not found!");
        return;
    }
    canvas = {
        a: document.createElement('canvas'), // Offscreen canvas for drawing rays
        b: document.createElement('canvas')  // Onscreen canvas for display
    };
    // Style the onscreen canvas (canvas.b)
    canvas.b.style.position = 'fixed';
    canvas.b.style.top = '0';
    canvas.b.style.left = '0';
    canvas.b.style.width = '100%';
    canvas.b.style.height = '100%';
    canvas.b.style.zIndex = '0'; // Ensure it's behind .overlay-content

    container.appendChild(canvas.b);

    ctx = {
        a: canvas.a.getContext('2d'),
        b: canvas.b.getContext('2d')
    };
    center = []; // Will be set in resize
}

function resize() {
    if (!canvas || !canvas.a || !canvas.b) return; // Guard against canvas not being initialized

    const { innerWidth, innerHeight } = window;

    canvas.a.width = innerWidth;
    canvas.a.height = innerHeight;

    // If canvas.b exists and has content, draw it to canvas.a before resizing canvas.b
    // This is usually for preserving content, but here we clear and redraw, so it might not be strictly necessary.
    // However, the original code had it, so keeping the logic.
    if (ctx.a && ctx.b && canvas.b.width > 0 && canvas.b.height > 0) {
        ctx.a.drawImage(canvas.b, 0, 0);
    }

    canvas.b.width = innerWidth;
    canvas.b.height = innerHeight;

    // Draw the (potentially preserved) content of canvas.a back to the resized canvas.b
    if (ctx.b && ctx.a && canvas.a.width > 0 && canvas.a.height > 0) {
        ctx.b.drawImage(canvas.a, 0, 0);
    }

    center[0] = 0.5 * canvas.a.width;
    center[1] = 0.5 * canvas.a.height;

    // Re-initialize rays if screen size changes significantly (optional, but can prevent weirdness)
    // For simplicity, we are not re-initializing rays on resize here, but it could be added.
    // initRays(); 
}

function draw() {
    if (!ctx || !canvas) { // Ensure context and canvas are initialized
        window.requestAnimationFrame(draw); // Keep trying if not ready
        return;
    }
    tick++;
    ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height); // Clear the offscreen canvas

    // Fill the onscreen canvas with the background color
    ctx.b.fillStyle = backgroundColor;
    ctx.b.fillRect(0, 0, canvas.b.width, canvas.b.height);

    drawRays(); // Draw rays onto the offscreen canvas (a)
    render();   // Render the offscreen canvas to the onscreen one with effects

    window.requestAnimationFrame(draw);
}

window.addEventListener('load', setup);
window.addEventListener('resize', resize);

document.addEventListener('DOMContentLoaded', () => {
    // Theme Switching
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Initialize theme based on system preference or stored value
    function initializeTheme() {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            document.documentElement.setAttribute('data-theme', storedTheme);
            updateThemeIcon(storedTheme);
        } else {
            const theme = prefersDark.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', theme);
            updateThemeIcon(theme);
        }
    }

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        } else {
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
        }
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);

        // Add animation class
        document.documentElement.classList.add('theme-transition');
        setTimeout(() => {
            document.documentElement.classList.remove('theme-transition');
        }, 300);
    }

    themeToggle.addEventListener('click', toggleTheme);
    prefersDark.addEventListener('change', (e) => {
        const theme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
    });

    // Mobile Menu
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
        mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
    }

    mobileMenuButton.addEventListener('click', toggleMobileMenu);
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
        });
    });

    // Header Scroll Effect
    const header = document.getElementById('main-header');
    let lastScrollPosition = 0;

    function handleScroll() {
        const currentScrollPosition = window.pageYOffset;
        
        if (currentScrollPosition > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }

        lastScrollPosition = currentScrollPosition;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize Swiper for Screenshots
    if (document.querySelector('.swiper-container')) {
        new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                }
            }
        });
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

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Initialize theme on page load
    initializeTheme();
});