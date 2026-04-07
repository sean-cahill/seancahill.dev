/**
 * Vanguard Engine v2 - Motion, Interaction & Visual Systems
 * All scroll/animation logic batched into a single RAF loop for performance.
 */

(function () {
  'use strict';

  /* ========================================================================
     STATE & UTILITIES
     ======================================================================== */

  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let mouseX = -200, mouseY = -200;
  let smoothScroll = 0;
  let targetScroll = 0;
  let scrollVelocity = 0;
  let prevScroll = 0;
  let isMouseInWindow = false;
  let rafCallbacks = [];

  function onRaf(fn) { rafCallbacks.push(fn); }

  /* ========================================================================
     LOADER SEQUENCE
     ======================================================================== */

  const loader = document.getElementById('loader');

  function initLoader() {
    if (prefersReducedMotion || !loader) {
      document.body.classList.remove('is-loading');
      document.body.classList.add('is-loaded');
      revealHero(0);
      return;
    }

    setTimeout(() => {
      document.body.classList.remove('is-loading');
      document.body.classList.add('is-loaded');

      setTimeout(() => {
        revealHero(100);
      }, 300);

      setTimeout(() => {
        if (loader && loader.parentNode) loader.remove();
      }, 1200);
    }, 1800);
  }

  function revealHero(baseDelay) {
    const heroElements = document.querySelectorAll('.hero .anim-reveal');
    heroElements.forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), baseDelay + i * 120);
    });
  }

  /* ========================================================================
     INTERSECTION OBSERVER - SCROLL REVEALS
     ======================================================================== */

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  });

  document.querySelectorAll('.anim-scroll').forEach((el) => observer.observe(el));

  /* ========================================================================
     NAV ISLAND
     ======================================================================== */

  const nav = document.getElementById('nav');
  const navInner = nav ? nav.querySelector('.nav-island__inner') : null;
  const navLinks = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('section[id]');

  function updateNav() {
    if (!navInner) return;
    const y = window.scrollY;

    if (y > 50) {
      navInner.style.background = 'rgba(10, 10, 10, 0.85)';
      navInner.style.borderColor = 'var(--border-highlight)';
      navInner.classList.add('scrolled');
    } else {
      navInner.style.background = 'rgba(10, 10, 10, 0.6)';
      navInner.style.borderColor = 'var(--border-subtle)';
      navInner.classList.remove('scrolled');
    }

    if (navLinks.length && sections.length) {
      let activeId = '';
      sections.forEach((sec) => {
        if (sec.offsetTop - 200 <= y) activeId = sec.id;
      });
      navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href && href.slice(1) === activeId) {
          link.classList.add('active-section');
        } else {
          link.classList.remove('active-section');
        }
      });
    }
  }

  /* ========================================================================
     SMOOTH ANCHOR LINKS
     ======================================================================== */

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ========================================================================
     MAGNETIC BUTTONS
     ======================================================================== */

  document.querySelectorAll('.magnetic-btn').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const x = e.clientX - rect.left - cx;
      const y = e.clientY - rect.top - cy;

      el.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px) rotate(${x * 0.05}deg)`;

      const btnText = el.querySelector('.btn__text');
      if (btnText) {
        btnText.style.textShadow =
          `${-x * 0.08}px ${-y * 0.08}px 0 rgba(255,80,80,0.4), ` +
          `${x * 0.08}px ${y * 0.08}px 0 rgba(80,255,255,0.4)`;
      }
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0,0) rotate(0deg)';
      const btnText = el.querySelector('.btn__text');
      if (btnText) btnText.style.textShadow = 'none';
    });
  });

  /* ========================================================================
     CUSTOM CURSOR SYSTEM
     ======================================================================== */

  const cursorRing = document.getElementById('cursor-ring');
  const cursorTrails = document.querySelectorAll('.cursor-trail');
  let ringX = -200, ringY = -200;
  let trailData = Array.from(cursorTrails).map(() => ({ x: -200, y: -200 }));

  if (cursorRing && !prefersReducedMotion) {
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isMouseInWindow) {
        isMouseInWindow = true;
        ringX = mouseX;
        ringY = mouseY;
        trailData.forEach((t) => { t.x = mouseX; t.y = mouseY; });
        cursorRing.style.opacity = '1';
        cursorTrails.forEach((t) => { t.style.opacity = '1'; });
      }
    });

    window.addEventListener('mouseleave', () => {
      isMouseInWindow = false;
      cursorRing.style.opacity = '0';
      cursorTrails.forEach((t) => { t.style.opacity = '0'; });
    });

    const interactives = document.querySelectorAll('a, button, .magnetic-btn');
    const cardElements = document.querySelectorAll('.bento-card__shell, .about__portrait-shell');
    const textElements = document.querySelectorAll('p, .hero__sub, .about__text, .editorial-item__content');

    interactives.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.remove('cursor-text', 'cursor-card');
        document.body.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    cardElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.remove('cursor-hover', 'cursor-text');
        document.body.classList.add('cursor-card');
      });
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-card'));
    });

    textElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        if (!document.body.classList.contains('cursor-hover') &&
            !document.body.classList.contains('cursor-card')) {
          document.body.classList.add('cursor-text');
        }
      });
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-text'));
    });

    onRaf(() => {
      ringX = lerp(ringX, mouseX, 0.15);
      ringY = lerp(ringY, mouseY, 0.15);
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

      const eases = [0.09, 0.06];
      cursorTrails.forEach((trail, i) => {
        const prev = i === 0 ? { x: ringX, y: ringY } : trailData[i - 1];
        trailData[i].x = lerp(trailData[i].x, prev.x, eases[i]);
        trailData[i].y = lerp(trailData[i].y, prev.y, eases[i]);
        trail.style.transform = `translate(${trailData[i].x}px, ${trailData[i].y}px) translate(-50%, -50%)`;
      });
    });
  } else {
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
  }

  /* ========================================================================
     3D TILT EFFECT FOR CARDS & PORTRAIT
     ======================================================================== */

  document.querySelectorAll('.bento-card__shell, .about__portrait-shell').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      el.style.setProperty('--rx', `${((y - cy) / cy) * -5}deg`);
      el.style.setProperty('--ry', `${((x - cx) / cx) * 5}deg`);
    });

    el.addEventListener('mouseleave', () => {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    });
  });

  /* ========================================================================
     WORKFLOW TOGGLES & WIRE ANIMATION
     ======================================================================== */

  const workflowSection = document.getElementById('workflow');
  const toggleBtns = document.querySelectorAll('.workflow-toggle-btn');
  const workflowContainers = document.querySelectorAll('.workflow__container');

  if (toggleBtns.length && workflowContainers.length) {
    toggleBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        toggleBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const targetId = btn.getAttribute('data-target');

        workflowContainers.forEach((c) => {
          if (c.id === targetId) {
            c.classList.add('active');
            setTimeout(() => window.dispatchEvent(new Event('scroll')), 50);
          } else {
            c.classList.remove('active');
            c.querySelectorAll('.workflow-node').forEach((n) => n.classList.remove('active'));
            const glow = c.querySelector('.workflow__wire-glow');
            if (glow) glow.style.height = '0%';
          }
        });
      });
    });
  }

  function updateWorkflowWire() {
    if (!workflowSection) return;
    const activeContainer = document.querySelector('.workflow__container.active');
    if (!activeContainer) return;

    const wireGlow = activeContainer.querySelector('.workflow__wire-glow');
    const nodes = activeContainer.querySelectorAll('.workflow-node');
    const sectionRect = workflowSection.getBoundingClientRect();
    const wh = window.innerHeight;

    const startTrigger = wh * 0.6;
    let progress = 0;

    if (sectionRect.top < startTrigger) {
      const scrollable = sectionRect.height - (startTrigger - wh * 0.2);
      progress = clamp((startTrigger - sectionRect.top) / scrollable, 0, 1);
    }

    if (wireGlow) {
      wireGlow.style.height = `${progress * 100}%`;
      const wireBottom = wireGlow.getBoundingClientRect().bottom;

      nodes.forEach((node) => {
        const dot = node.querySelector('.workflow-node__dot');
        if (dot) {
          const dotCenter = dot.getBoundingClientRect().top + dot.getBoundingClientRect().height / 2;
          node.classList.toggle('active', wireBottom >= dotCenter);
        }
      });
    }
  }

  /* ========================================================================
     SCROLL PROGRESS BAR
     ======================================================================== */

  const scrollProgressBar = document.getElementById('scroll-progress');

  function updateScrollProgress() {
    if (!scrollProgressBar) return;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    if (docH <= 0) return;
    const pct = clamp(window.scrollY / docH, 0, 1) * 100;
    scrollProgressBar.style.width = `${pct}%`;
  }

  /* ========================================================================
     SMOOTH SCROLL STATE (for parallax, not hijacking scroll)
     ======================================================================== */

  function updateSmoothScroll() {
    targetScroll = window.scrollY;
    scrollVelocity = targetScroll - prevScroll;
    smoothScroll = lerp(smoothScroll, targetScroll, 0.1);
    prevScroll = targetScroll;
  }

  /* ========================================================================
     PARALLAX DEPTH
     ======================================================================== */

  const parallaxHeaders = document.querySelectorAll('.section-header');
  const portraitWrapper = document.querySelector('.about__portrait-wrapper');

  function updateParallax() {
    const wh = window.innerHeight;

    parallaxHeaders.forEach((header) => {
      const rect = header.getBoundingClientRect();
      if (rect.top < wh && rect.bottom > 0) {
        const progress = (wh - rect.top) / (wh + rect.height);
        const offset = (progress - 0.5) * -30;
        header.style.transform = `translateY(${offset}px)`;
      }
    });

    if (portraitWrapper) {
      const rect = portraitWrapper.getBoundingClientRect();
      if (rect.top < wh && rect.bottom > 0) {
        const progress = (wh - rect.top) / (wh + rect.height);
        const offset = (progress - 0.5) * -20;
        portraitWrapper.style.transform = `translateY(${offset}px)`;
      }
    }
  }

  /* ========================================================================
     CONTACT SECTION SPOTLIGHT
     ======================================================================== */

  const contactInner = document.querySelector('.contact-card__inner');

  function updateContactSpotlight() {
    if (!contactInner) return;
    const rect = contactInner.getBoundingClientRect();
    if (rect.top > window.innerHeight || rect.bottom < 0) return;
    const x = mouseX - rect.left;
    const y = mouseY - rect.top;
    contactInner.style.setProperty('--spot-x', `${x}px`);
    contactInner.style.setProperty('--spot-y', `${y}px`);
  }

  /* ========================================================================
     AURORA GRADIENT CANVAS
     ======================================================================== */

  const canvas = document.getElementById('network-canvas');
  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext('2d');
    let cw, ch;
    let blobs = [];

    class AuroraBlob {
      constructor(x, y, radius, r, g, b, alpha) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.radius = radius;
        this.r = r;
        this.g = g;
        this.b = b;
        this.alpha = alpha;
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = 0.001 + Math.random() * 0.002;
        this.drift = 40 + Math.random() * 80;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
      }

      update(mx, my) {
        this.angle += this.angleSpeed;
        this.baseX += this.vx;
        this.baseY += this.vy;

        if (this.baseX < -this.radius * 0.5) this.vx = Math.abs(this.vx);
        if (this.baseX > cw + this.radius * 0.5) this.vx = -Math.abs(this.vx);
        if (this.baseY < -this.radius * 0.5) this.vy = Math.abs(this.vy);
        if (this.baseY > ch + this.radius * 0.5) this.vy = -Math.abs(this.vy);

        const dx = mx - this.baseX;
        const dy = my - this.baseY;
        this.baseX += dx * 0.003;
        this.baseY += dy * 0.003;

        this.x = lerp(this.x, this.baseX + Math.cos(this.angle) * this.drift, 0.02);
        this.y = lerp(this.y, this.baseY + Math.sin(this.angle) * this.drift, 0.02);
      }

      draw() {
        const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        g.addColorStop(0, `rgba(${this.r}, ${this.g}, ${this.b}, ${this.alpha})`);
        g.addColorStop(0.5, `rgba(${this.r}, ${this.g}, ${this.b}, ${this.alpha * 0.3})`);
        g.addColorStop(1, `rgba(${this.r}, ${this.g}, ${this.b}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initAurora() {
      cw = window.innerWidth;
      ch = window.innerHeight;
      canvas.width = cw;
      canvas.height = ch;

      const rFactor = Math.min(cw, ch) * 0.35;
      blobs = [
        new AuroraBlob(cw * 0.3, ch * 0.3, rFactor + 100, 211, 185, 148, 0.12),
        new AuroraBlob(cw * 0.7, ch * 0.5, rFactor + 50, 160, 130, 90, 0.08),
        new AuroraBlob(cw * 0.5, ch * 0.7, rFactor + 80, 100, 90, 75, 0.06),
        new AuroraBlob(cw * 0.2, ch * 0.8, rFactor, 180, 160, 130, 0.05),
      ];
    }

    function drawAurora() {
      ctx.clearRect(0, 0, cw, ch);
      ctx.fillStyle = '#070707';
      ctx.fillRect(0, 0, cw, ch);

      blobs.forEach((blob) => {
        blob.update(mouseX, mouseY);
        blob.draw();
      });
    }

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(initAurora, 200);
    });

    initAurora();
    onRaf(drawAurora);
  } else if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = '#070707';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  /* ========================================================================
     DYNAMIC FOOTER YEAR
     ======================================================================== */

  const footerCopy = document.querySelector('.footer__copy');
  if (footerCopy) {
    footerCopy.innerHTML = `&copy; ${new Date().getFullYear()} Se\u00e1n`;
  }

  /* ========================================================================
     MASTER RAF LOOP
     ======================================================================== */

  function tick() {
    updateSmoothScroll();
    updateNav();
    updateWorkflowWire();
    updateScrollProgress();
    updateParallax();
    updateContactSpotlight();

    for (let i = 0; i < rafCallbacks.length; i++) {
      rafCallbacks[i]();
    }

    requestAnimationFrame(tick);
  }

  /* ========================================================================
     BOOT
     ======================================================================== */

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initLoader();
      requestAnimationFrame(tick);
    });
  } else {
    initLoader();
    requestAnimationFrame(tick);
  }

})();
