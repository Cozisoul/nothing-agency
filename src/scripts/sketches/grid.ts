// src/scripts/sketches/grid.ts
import type p5 from 'p5';

export const gridSketch = (p: p5) => {
  // CONFIGURATION
  const gap = 50; // Distance between points
  const baseSize = 1.5; // Resting size of dots
  const influenceRadius = 200; // How far the mouse reaches
  const friction = 0.9; // Physics damping
  const spring = 0.1; // Snap back speed

  // Data structure for our grid points
  let points: { 
    x: number; 
    y: number; 
    vx: number; 
    vy: number; 
    originalX: number; 
    originalY: number; 
  }[] = [];

  p.setup = () => {
    const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent('generative-substrate'); // Attach to specific div
    p.noStroke();
    
    createGrid();
  };

  p.draw = () => {
    p.clear(); // Keep background transparent

    const mouseX = p.mouseX;
    const mouseY = p.mouseY;

    p.fill(80); // Subtle Grey (#505050) - Visible on black

    for (let i = 0; i < points.length; i++) {
      const pt = points[i];
      
      // 1. Calculate distance to mouse
      const dx = mouseX - pt.x;
      const dy = mouseY - pt.y;
      const dist = p.sqrt(dx * dx + dy * dy);

      // 2. Physics Logic
      // If mouse is close, push point away
      if (dist < influenceRadius) {
        const angle = p.atan2(dy, dx);
        const targetX = pt.x - p.cos(angle) * 50; // Push force
        const targetY = pt.y - p.sin(angle) * 50;
        
        pt.vx += (targetX - pt.x) * 0.05;
        pt.vy += (targetY - pt.y) * 0.05;
        
        // Optional: Highlight color when active
        p.fill(255, 69, 0); // OrangeRed (Your Accent)
      } else {
        // Return to original position (Spring)
        const dxOrig = pt.originalX - pt.x;
        const dyOrig = pt.originalY - pt.y;
        pt.vx += dxOrig * spring;
        pt.vy += dyOrig * spring;
        
        // Reset color to grey
        p.fill(80); 
      }

      // Apply velocity and friction
      pt.vx *= friction;
      pt.vy *= friction;
      pt.x += pt.vx;
      pt.y += pt.vy;

      // 3. Draw
      p.circle(pt.x, pt.y, baseSize);
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight);
    createGrid();
  };

  function createGrid() {
    points = [];
    for (let x = gap/2; x < window.innerWidth; x += gap) {
      for (let y = gap/2; y < window.innerHeight; y += gap) {
        points.push({
          x, y, vx: 0, vy: 0, originalX: x, originalY: y
        });
      }
    }
  }
};
