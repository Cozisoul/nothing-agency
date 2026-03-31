import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

export const initPhysics = () => {
  // 1. Initialize Lenis (The Smooth Scroll)
  lenis = new Lenis({
    duration: 1.2, // The "Weight" of the scroll
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease
    // direction: 'vertical', // Default is vertical
    // gestureDirection: 'vertical',
    // smooth: true,
    // mouseMultiplier: 1,
    // smoothTouch: false,
    // touchMultiplier: 2,
  });

  // 2. Connect Lenis to GSAP
  // This ensures animations sync perfectly with the smooth scroll
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  return lenis;
};

export const getLenis = () => lenis;
