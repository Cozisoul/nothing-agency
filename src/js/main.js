// main.js - v2.1 (with Theme Toggling)

// --- 1. DOM Element Selectors ---
const entryGate = document.getElementById('entry-gate');
const mainContent = document.getElementById('main-content');
const cursor = document.getElementById('cursor');
const animatedSections = document.querySelectorAll('.section');
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// --- 2. THEME TOGGLING LOGIC ---
// This function checks for a saved theme and the OS preference.
function applyInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) { // A user choice in localStorage takes precedence
        htmlElement.className = savedTheme; // Apply 'dark-mode' or 'light-mode'
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // If no saved theme, respect the OS preference
        htmlElement.classList.add('dark-mode');
    }
}

// Event listener for the toggle button
themeToggle.addEventListener('click', () => {
    // Toggle the primary dark mode class
    htmlElement.classList.toggle('dark-mode');
    
    // Create a class for the light mode override if needed
    if (!htmlElement.classList.contains('dark-mode')) {
        htmlElement.classList.add('light-mode');
    } else {
        htmlElement.classList.remove('light-mode');
    }

    // Save the user's explicit choice to localStorage
    const newTheme = htmlElement.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
    localStorage.setItem('theme', newTheme);
});

// --- 3. CORE SITE LOGIC (Unlock, Animations) ---
// This logic remains the same as before.
let hasUnlocked = false;

function unlockSite() {
    if (hasUnlocked) return;
    hasUnlocked = true;
    if (cursor) {
        cursor.style.animation = 'none';
        cursor.style.opacity = '0';
    }
    if (entryGate) {
        entryGate.classList.add('is-hidden');
    }
    setTimeout(() => {
        if (entryGate) entryGate.style.display = 'none';
        if (mainContent) {
            mainContent.classList.remove('is-hidden');
            document.body.classList.add('site-unlocked');
        }
    }, 600);
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

animatedSections.forEach(section => observer.observe(section));

// --- 4. INITIALIZATION ---
function init() {
    applyInitialTheme(); // Apply the correct theme on page load
    window.addEventListener('keydown', unlockSite, { once: true });
    window.addEventListener('click', unlockSite, { once: true });
}

init();