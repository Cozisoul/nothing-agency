import { gsap } from 'gsap';
import { getLenis } from '../utils/physics';

export const initKineticType = () => {
  const lenis = getLenis();
  if (!lenis) return;
  // Skill 08: Responsive Adaptation - Disable on touch devices to prevent motion sickness/jank
  if (window.matchMedia('(pointer: coarse)').matches) return;

  // 1. Select all elements we want to react to physics
  const targets = document.querySelectorAll('.kinetic-text');
  
  if (!targets.length) return;

  // 2. Create a GSAP QuickSetter for maximum performance
  // We use quickSetter because it skips parsing strings every frame.
  // We skew on the Y axis to give it a "drag" effect.
  const setSkew = gsap.quickSetter(targets, "skewY", "deg");
  
  // Optional: Rotation or other properties can be added here
  // const setRotate = gsap.quickSetter(targets, "rotate", "deg"); 

  // 3. Hook into the Scroll Loop
  lenis.on('scroll', (e: any) => {
    // Lenis scroll event provides velocity
    // Note: older/newer versions might differ in event structure. 
    // Usually e.velocity is present.
    const velocity = e.velocity || 0; 

    // 4. The Math (Clamp the effect so it doesn't go crazy)
    // We divide velocity to make the effect subtle.
    const skewAmount = Math.max(Math.min(velocity / 15, 10), -10);

    // 5. Apply the physics
    setSkew(skewAmount);
  });
};
