/* ============================================
   DAYS — main.js
   ============================================ */

/* ===================================
   1. CUSTOM CURSOR
   =================================== */
const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;
let rafId;

// Track mouse position instantly for the dot
document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  // Dot follows instantly
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

// Ring follows with smooth lerp
function lerpRing() {
  const ease = 0.12;
  ringX += (mouseX - ringX) * ease;
  ringY += (mouseY - ringY) * ease;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  rafId = requestAnimationFrame(lerpRing);
}
lerpRing();

// Hover effect on interactive elements
const hoverTargets = 'a, button, .library__card, .where__toggle, .btn';
document.querySelectorAll(hoverTargets).forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorRing.classList.add('is-hovering');
    cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
  });
  el.addEventListener('mouseleave', () => {
    cursorRing.classList.remove('is-hovering');
    cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
  });
});

// Click effect
document.addEventListener('mousedown', () => cursorDot.classList.add('is-clicking'));
document.addEventListener('mouseup',   () => cursorDot.classList.remove('is-clicking'));

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
  cursorDot.style.opacity  = '0';
  cursorRing.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  cursorDot.style.opacity  = '1';
  cursorRing.style.opacity = '1';
});


/* ===================================
   2. SCROLL PROGRESS BAR
   =================================== */
const progressBar = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
  const scrollTop    = window.scrollY;
  const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPct    = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = scrollPct + '%';
}, { passive: true });


/* ===================================
   3. TYPEWRITER
   =================================== */
const typeTarget  = document.getElementById('typewriterText');
const typeCursor  = document.querySelector('.typewriter__cursor');
const phrases     = [
  'Thoughts today,',
  'Ideas live here,',
  'Every day counts,',
  'Write it down,',
];
let   phraseIndex = 0;
let   charIndex   = 0;
let   isDeleting  = false;
let   typeStarted = false;

function typeWriter() {
  const current = phrases[phraseIndex];

  if (!isDeleting) {
    // Typing forward
    typeTarget.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      // Pause at end then start deleting
      setTimeout(() => { isDeleting = true; typeWriter(); }, 2200);
      return;
    }
    setTimeout(typeWriter, 80);
  } else {
    // Deleting
    typeTarget.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeWriter, 400);
      return;
    }
    setTimeout(typeWriter, 45);
  }
}

// Start typewriter after a short delay so page load feels settled
setTimeout(() => {
  typeStarted = true;
  typeWriter();
}, 800);


/* ===================================
   4. STARS
   =================================== */
(function generateStars() {
  const container = document.getElementById('heroStars');
  if (!container) return;
  for (let i = 0; i < 90; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.cssText = `
      top: ${Math.random() * 85}%;
      left: ${Math.random() * 100}%;
      --dur: ${1.5 + Math.random() * 3}s;
      --delay: ${Math.random() * 4}s;
      opacity: ${0.1 + Math.random() * 0.6};
      width: ${1 + Math.random() * 2}px;
      height: ${1 + Math.random() * 2}px;
    `;
    container.appendChild(star);
  }
})();


/* ===================================
   5. NAV SCROLL EFFECT
   =================================== */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });


/* ===================================
   6. SCROLL REVEAL
   =================================== */
const revealEls = document.querySelectorAll(
  '.reveal-up, .reveal-left, .reveal-right, .reveal-scale'
);
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObserver.observe(el));


/* ===================================
   7. ACCORDION
   =================================== */
document.querySelectorAll('.where__toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const item   = btn.closest('.where__item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.where__item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});


/* ===================================
   8. HERO PARALLAX
   =================================== */
const heroShapes = document.querySelectorAll('.hero__shape');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  heroShapes.forEach((s, i) => {
    s.style.transform = `translateY(${y * (i + 1) * 0.15}px)`;
  });
}, { passive: true });


/* ===================================
   9. CARD HOVER ACCENT
   =================================== */
document.querySelectorAll('.library__card').forEach(card => {
  const p = card.querySelector('p');
  card.addEventListener('mouseenter', () => { p.style.color = '#7c3aed'; });
  card.addEventListener('mouseleave', () => { p.style.color = '#666'; });
});


/* ===================================
   10. PAGE TRANSITION
   =================================== */
const overlay = document.getElementById('pageTransition');
document.querySelectorAll('a[href="#"]').forEach(link => {
  link.addEventListener('click', e => {
    if (
      link.classList.contains('btn--nav') ||
      link.classList.contains('btn--hero') ||
      link.classList.contains('btn--outline')
    ) {
      e.preventDefault();
      overlay.classList.add('is-entering');
      setTimeout(() => {
        overlay.classList.remove('is-entering');
        overlay.classList.add('is-leaving');
      }, 500);
      setTimeout(() => overlay.classList.remove('is-leaving'), 1000);
    }
  });
});


/* ===================================
   11. SMOOTH LOAD FADE IN
   =================================== */
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => { document.body.style.opacity = '1'; });
});