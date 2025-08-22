// main.js - v1.2 (Robust Selectors)
// The core logic for the *nothing... agency experience.

// --- 1. DOM Element Selectors ---
const entryGate = document.getElementById('entry-gate');
const mainContent = document.getElementById('main-content');
const cursor = document.getElementById('cursor');
const animatedSections = document.querySelectorAll('.section');

// --- 2. Core State ---
let hasUnlocked = false;

// --- 3. The "Unlock" Function ---
function unlockSite() {
    if (hasUnlocked || !entryGate || !mainContent) return; // Guard clause
    hasUnlocked = true;

    console.log('Interaction detected. Unlocking site...');

    if (cursor) {
        cursor.style.animation = 'none';
        cursor.style.opacity = '0';
    }

    entryGate.classList.add('is-hidden');

    setTimeout(() => {
        entryGate.style.display = 'none';
        mainContent.classList.remove('is-hidden');
        document.body.classList.add('site-unlocked');
    }, 600);
}

// --- 4. The Scroll Animation ---
if (animatedSections.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedSections.forEach(section => {
        observer.observe(section);
    });
}

// --- 5. Event Listeners ---
window.addEventListener('keydown', unlockSite, { once: true });
window.addEventListener('click', unlockSite, { once: true });