/**
 * Vanguard Engine - Motion & Interaction
 * Handles IntersectionObserver reveals, magnetic buttons, and text scramble.
 */

// 1. Scroll-Triggered Reveals
const observerOptions = {
  root: null,
  rootMargin: '0px 0px -10% 0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Optional: unobserve after reveal
      // observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.anim-reveal, .anim-scroll').forEach((el) => {
  observer.observe(el);
});

// Trigger hero animations immediately on load
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelectorAll('.hero .anim-reveal').forEach((el) => {
      el.classList.add('visible');
    });
  }, 100);
});

// 2. Nav Island Dynamic Background
const nav = document.getElementById('nav');
const navInner = nav.querySelector('.nav-island__inner');
let lastScroll = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  
  if (currentScroll > 50) {
    navInner.style.background = 'rgba(10, 10, 10, 0.85)';
    navInner.style.borderColor = 'var(--border-highlight)';
    navInner.classList.add('scrolled');
  } else {
    navInner.style.background = 'rgba(10, 10, 10, 0.6)';
    navInner.style.borderColor = 'var(--border-subtle)';
    navInner.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
}, { passive: true });

// 3. Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// 4. Magnetic Buttons (Psychedelic High-end interaction)
const magneticElements = document.querySelectorAll('.magnetic-btn');

magneticElements.forEach((el) => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const h = rect.width / 2;
    const w = rect.height / 2;
    
    // Calculate cursor position relative to element center
    const x = e.clientX - rect.left - h;
    const y = e.clientY - rect.top - w;
    
    // Intense springy transform with rotation based on movement
    el.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px) rotate(${x * 0.05}deg)`;
    
    // Psychedelic text shadow split
    if (el.querySelector('.btn__text')) {
      el.querySelector('.btn__text').style.textShadow = `
        ${-x * 0.1}px ${-y * 0.1}px 0px rgba(255, 0, 0, 0.5),
        ${x * 0.1}px ${y * 0.1}px 0px rgba(0, 255, 255, 0.5)
      `;
    }
  });

  el.addEventListener('mouseleave', () => {
    // Reset with a spring-like CSS transition
    el.style.transform = 'translate(0px, 0px) rotate(0deg)';
    if (el.querySelector('.btn__text')) {
      el.querySelector('.btn__text').style.textShadow = 'none';
    }
  });
});

// 5. Removed Text Scramble Effect
// The scramble effect was removed for a cleaner, more premium feel.

// 6. Dynamic Footer Year
window.addEventListener('DOMContentLoaded', () => {
  const footerCopy = document.querySelector('.footer__copy');
  if (footerCopy) {
    const year = new Date().getFullYear();
    footerCopy.innerHTML = `&copy; ${year} Seán`;
  }
});

// 7. (Removed Hero Parallax)

// 8. Custom Cursor
const cursorRing = document.getElementById('cursor-ring');
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let ringX = mouseX;
let ringY = mouseY;
let isMouseMoving = false;

window.addEventListener('mousemove', (e) => {
  if (!isMouseMoving && cursorRing) {
    cursorRing.style.opacity = '1';
    isMouseMoving = true;
    // Instantly snap to first position to avoid flying in from top-left
    ringX = e.clientX;
    ringY = e.clientY;
  }
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Smooth animate the ring
function renderCursor() {
  // ease factor
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  
  if (cursorRing) {
    cursorRing.style.transform = `translate(calc(-50% + ${ringX}px), calc(-50% + ${ringY}px))`;
  }
  requestAnimationFrame(renderCursor);
}
requestAnimationFrame(renderCursor);

// Add hover states for interactive elements
const interactives = document.querySelectorAll('a, button, .bento-card__shell, .magnetic-btn');
interactives.forEach(el => {
  el.addEventListener('mouseenter', () => {
    document.body.classList.add('cursor-hover');
  });
  el.addEventListener('mouseleave', () => {
    document.body.classList.remove('cursor-hover');
  });
});

// 9. 3D Tilt Effect for Bento Cards & Portrait
const tiltElements = document.querySelectorAll('.bento-card__shell, .about__portrait-shell');

tiltElements.forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Rotate max 5deg
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    
    el.style.setProperty('--rx', `${rotateX}deg`);
    el.style.setProperty('--ry', `${rotateY}deg`);
    el.style.setProperty('--mouse-x', `${x}px`);
    el.style.setProperty('--mouse-y', `${y}px`);
  });
  
  el.addEventListener('mouseleave', () => {
    el.style.setProperty('--rx', `0deg`);
    el.style.setProperty('--ry', `0deg`);
    // Glare opacity is handled in CSS
  });
});

// 9.5 Workflow Wire Scroll Animation & Toggles
const workflowSection = document.getElementById('workflow');
const toggleBtns = document.querySelectorAll('.workflow-toggle-btn');
const workflowContainers = document.querySelectorAll('.workflow__container');

// Toggle Logic
if (toggleBtns.length > 0 && workflowContainers.length > 0) {
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all buttons
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const targetId = btn.getAttribute('data-target');
      
      // Switch containers
      workflowContainers.forEach(container => {
        if (container.id === targetId) {
          container.classList.add('active');
          // Reset scroll animations for new container
          setTimeout(() => {
            window.dispatchEvent(new Event('scroll'));
          }, 50);
        } else {
          container.classList.remove('active');
          // Reset nodes in hidden containers
          container.querySelectorAll('.workflow-node').forEach(node => {
            node.classList.remove('active');
          });
          const glow = container.querySelector('.workflow__wire-glow');
          if (glow) glow.style.height = '0%';
        }
      });
    });
  });
}

// Scroll Logic
if (workflowSection) {
  window.addEventListener('scroll', () => {
    const activeContainer = document.querySelector('.workflow__container.active');
    if (!activeContainer) return;
    
    const wireGlow = activeContainer.querySelector('.workflow__wire-glow');
    const workflowNodes = activeContainer.querySelectorAll('.workflow-node');
    
    const sectionRect = workflowSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate how far the section is scrolled into view
    // Start drawing when the top of the section is near the middle of the screen
    const startTrigger = windowHeight * 0.6;
    const endTrigger = windowHeight * 0.2;
    
    let progress = 0;
    
    if (sectionRect.top < startTrigger) {
      const scrollableDistance = sectionRect.height - (startTrigger - endTrigger);
      const scrolled = startTrigger - sectionRect.top;
      progress = Math.min(Math.max(scrolled / scrollableDistance, 0), 1);
    }
    
    // Update the glow height
    if (wireGlow) {
      wireGlow.style.height = `${progress * 100}%`;
      
      // Check if nodes should become active based on the glow line
      const wireRect = wireGlow.getBoundingClientRect();
      const wireBottom = wireRect.bottom;
      
      workflowNodes.forEach(node => {
        const dot = node.querySelector('.workflow-node__dot');
        if (dot) {
          const dotRect = dot.getBoundingClientRect();
          // If the glow line has reached the dot
          if (wireBottom >= dotRect.top + (dotRect.height / 2)) {
            node.classList.add('active');
          } else {
            node.classList.remove('active');
          }
        }
      });
    }
  }, { passive: true });
}

// 10. Elegant Plexus / Constellation Canvas
const canvas = document.getElementById('network-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d', { alpha: false });
  let width, height;
  let particles = [];
  const maxParticles = 120; // Fewer particles for elegance
  const connectionDistance = 150;
  
  // Mouse state
  let mX = -1000;
  let mY = -1000;

  window.addEventListener('mousemove', (e) => {
    mX = e.clientX;
    mY = e.clientY;
  });
  
  window.addEventListener('mouseleave', () => {
    mX = -1000;
    mY = -1000;
  });
  
  class Particle {
    constructor() {
      this.reset();
      this.y = Math.random() * height;
    }
    
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5; // Slow movement
      this.vy = (Math.random() - 0.5) * 0.5;
      this.baseSize = Math.random() * 1.5 + 0.5; // Small dots
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      
      // Wrap around edges smoothly
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
      
      // Slight mouse repulsion for interactivity
      const dx = mX - this.x;
      const dy = mY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 150) {
        const force = (150 - dist) / 150;
        this.x -= (dx / dist) * force * 1;
        this.y -= (dy / dist) * force * 1;
      }
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.baseSize, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(211, 185, 148, 0.4)';
      ctx.fill();
    }
  }
  
  function initCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    
    particles = [];
    const count = Math.min(maxParticles, (width * height) / 10000);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }
  
  function drawCanvas() {
    ctx.fillStyle = '#070707';
    ctx.fillRect(0, 0, width, height);
    
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
      
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < connectionDistance) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const opacity = 1 - (dist / connectionDistance);
          ctx.strokeStyle = `rgba(211, 185, 148, ${opacity * 0.15})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
      
      // Connect to mouse
      const mDx = particles[i].x - mX;
      const mDy = particles[i].y - mY;
      const mDist = Math.sqrt(mDx * mDx + mDy * mDy);
      
      if (mDist < connectionDistance) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(mX, mY);
        const opacity = 1 - (mDist / connectionDistance);
        ctx.strokeStyle = `rgba(211, 185, 148, ${opacity * 0.25})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
    
    requestAnimationFrame(drawCanvas);
  }
  
  window.addEventListener('resize', initCanvas);
  initCanvas();
  drawCanvas();
}