// =============================================
// SENIOR FRONTEND ENGINEER VERSION
// Portfolio - Shahid Gul
// Modern, Performant, Accessible JavaScript
// =============================================

'use strict';

// ===== CONFIGURATION =====
const CONFIG = {
  animationDuration: 300,
  scrollOffset: 80,
  typingSpeed: 100,
  deletingSpeed: 50,
  typingDelay: 2000,
};

// ===== UTILITY FUNCTIONS =====
const utils = {
  // Debounce function for performance
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function for scroll events
  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Check if element is in viewport
  isInViewport(element, offset = 0) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= -offset &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  // Smooth scroll to element
  scrollToElement(element, offset = CONFIG.scrollOffset) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initPreloader();
  initThemeSwitch();
  initNavigation();
  initMobileMenu();
  initCustomCursor();
  initTypingEffect();
  initScrollAnimations();
  initParticles();
  initProjectFilter();
  initSkillBars();
  initContactForm();
  initScrollToTop();
  initCounterAnimation();
  initGSAPAnimations();
  initLazyLoading();
  
  // Console branding
  consoleBranding();
});

// ===== PRELOADER =====
function initPreloader() {
  const preloader = document.querySelector('.preloader');
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.classList.remove('loading');
      
      // Remove from DOM after animation
      setTimeout(() => {
        preloader.remove();
      }, 500);
    }, 1000);
  });
}

// ===== THEME SWITCH =====
function initThemeSwitch() {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  
  // Get saved theme or use default
  const savedTheme = localStorage.getItem('theme') || 'dark';
  body.classList.add(savedTheme);
  
  // Theme toggle handler
  themeToggle.addEventListener('click', () => {
    const currentTheme = body.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.classList.remove(currentTheme);
    body.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Trigger theme change event for other components
    document.dispatchEvent(new CustomEvent('themeChange', { detail: { theme: newTheme } }));
  });
}

// ===== NAVIGATION =====
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  
  // Scroll spy
  const handleScroll = utils.throttle(() => {
    // Add scrolled class to navbar
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Update active link
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= sectionTop - CONFIG.scrollOffset - 100) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, 100);
  
  window.addEventListener('scroll', handleScroll);
  
  // Smooth scroll on link click
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        utils.scrollToElement(targetSection);
        
        // Close mobile menu if open
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu.classList.contains('active')) {
          toggleMobileMenu();
        }
      }
    });
  });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  
  if (!menuToggle || !mobileMenu) return;
  
  menuToggle.addEventListener('click', toggleMobileMenu);
  
  // Close menu on link click
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        utils.scrollToElement(targetSection);
        toggleMobileMenu();
      }
    });
  });
  
  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('active') &&
        !mobileMenu.contains(e.target) &&
        !menuToggle.contains(e.target)) {
      toggleMobileMenu();
    }
  });
}

function toggleMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  menuToggle.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}

// ===== CUSTOM CURSOR =====
function initCustomCursor() {
  // Only on desktop
  if (window.innerWidth < 768 || 'ontouchstart' in window) return;
  
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');
  
  if (!cursorDot || !cursorOutline) return;
  
  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
    
    document.body.classList.add('cursor-active');
  });
  
  // Smooth cursor outline animation
  function animateCursor() {
    const speed = 0.15;
    
    outlineX += (mouseX - outlineX) * speed;
    outlineY += (mouseY - outlineY) * speed;
    
    cursorOutline.style.left = `${outlineX}px`;
    cursorOutline.style.top = `${outlineY}px`;
    
    requestAnimationFrame(animateCursor);
  }
  
  animateCursor();
  
  // Hover effect on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .btn, .card, input, textarea');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.style.transform = 'scale(1.5)';
      cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
      cursorDot.style.transform = 'scale(1)';
      cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });
}

// ===== TYPING EFFECT =====
function initTypingEffect() {
  const typingElement = document.querySelector('.typing-text');
  if (!typingElement) return;
  
  const texts = [
    'Frontend Developer',
    'UI/UX Designer',
    'React Specialist',
    'Web Developer'
  ];
  
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }
    
    let typeSpeed = isDeleting ? CONFIG.deletingSpeed : CONFIG.typingSpeed;
    
    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = CONFIG.typingDelay;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 500;
    }
    
    setTimeout(type, typeSpeed);
  }
  
  type();
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
      }
    });
  }, observerOptions);
  
  // Observe all elements with data-aos
  document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
  });
}

// ===== PARTICLE CANVAS =====
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationFrame;
  
  // Set canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', utils.debounce(resizeCanvas, 250));
  
  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2;
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(124, 58, 237, 0.3)';
      ctx.fill();
    }
  }
  
  // Create particles
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle());
  }
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(124, 58, 237, ${0.2 * (1 - distance / 150)})`;
          ctx.stroke();
        }
      }
    }
    
    animationFrame = requestAnimationFrame(animate);
  }
  
  animate();
  
  // Pause animation when not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrame);
    } else {
      animate();
    }
  });
}

// ===== PROJECT FILTER =====
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (!filterBtns.length || !projectCards.length) return;
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-filter');
      
      // Filter projects
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
          card.style.animation = 'fadeOut 0.3s ease forwards';
          setTimeout(() => {
            card.classList.add('hidden');
          }, 300);
        }
      });
    });
  });
}

// ===== SKILL BARS ANIMATION =====
function initSkillBars() {
  const skillCards = document.querySelectorAll('.skill-card');
  
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target.querySelector('.skill-progress');
        const progress = progressBar.getAttribute('data-progress');
        
        setTimeout(() => {
          progressBar.style.width = `${progress}%`;
        }, 100);
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  skillCards.forEach(card => observer.observe(card));
}

// ===== CONTACT FORM =====
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm(form)) return;
    
    const submitBtn = form.querySelector('.btn-submit');
    const btnText = submitBtn.querySelector('.btn-text');
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    try {
      await simulateFormSubmission(new FormData(form));
      
      // Success
      showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
      form.reset();
    } catch (error) {
      // Error
      showToast('Failed to send message. Please try again.', 'error');
    } finally {
      // Reset button state
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  });
}

function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  
  inputs.forEach(input => {
    const formGroup = input.closest('.form-group');
    const errorEl = formGroup.querySelector('.form-error');
    
    // Remove previous error
    formGroup.classList.remove('error');
    
    // Validate
    if (!input.value.trim()) {
      formGroup.classList.add('error');
      errorEl.textContent = 'This field is required';
      isValid = false;
    } else if (input.type === 'email' && !isValidEmail(input.value)) {
      formGroup.classList.add('error');
      errorEl.textContent = 'Please enter a valid email';
      isValid = false;
    }
  });
  
  return isValid;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function simulateFormSubmission(formData) {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
}

// ===== TOAST NOTIFICATION =====
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  const toastMessage = toast.querySelector('.toast-message');
  
  toast.className = `toast ${type}`;
  toastMessage.textContent = message;
  
  setTimeout(() => toast.classList.add('show'), 100);
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

// ===== SCROLL TO TOP =====
function initScrollToTop() {
  const scrollBtn = document.getElementById('scrollToTop');
  
  if (!scrollBtn) return;
  
  const handleScroll = utils.throttle(() => {
    if (window.scrollY > 500) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  }, 100);
  
  window.addEventListener('scroll', handleScroll);
  
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ===== COUNTER ANIMATION =====
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number');
  
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-count'));
        animateCounter(entry.target, target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 50;
  const duration = 2000;
  const stepTime = duration / 50;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, stepTime);
}

// ===== GSAP ANIMATIONS =====
function initGSAPAnimations() {
  if (typeof gsap === 'undefined') return;
  
  gsap.registerPlugin(ScrollTrigger);
  
  // Hero animations
  gsap.from('.hero-badge', {
    opacity: 0,
    y: -30,
    duration: 0.8,
    ease: 'power3.out'
  });
  
  gsap.from('.hero-title', {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.2,
    ease: 'power4.out'
  });
  
  gsap.from('.hero-typing', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay: 0.4,
    ease: 'power3.out'
  });
  
  gsap.from('.hero-description', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay: 0.6,
    ease: 'power3.out'
  });
  
  gsap.from('.hero-buttons .btn', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
  });
  
  gsap.from('.code-window', {
    opacity: 0,
    x: 100,
    duration: 1.2,
    delay: 0.5,
    ease: 'power4.out'
  });
  
  // Section animations
  gsap.utils.toArray('.section').forEach(section => {
    gsap.from(section.querySelectorAll('.section-header'), {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out'
    });
  });
  
  // Parallax effect for floating cards
  gsap.utils.toArray('.floating-card').forEach((card, index) => {
    gsap.to(card, {
      y: '-=30',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      ease: 'none'
    });
  });
}

// ===== LAZY LOADING =====
function initLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    images.forEach(img => {
      img.src = img.dataset.src || img.src;
    });
  }
}

// ===== CONSOLE BRANDING =====
function consoleBranding() {
  const styles = [
    'color: #7c3aed',
    'font-size: 24px',
    'font-weight: bold',
    'text-shadow: 2px 2px 4px rgba(124, 58, 237, 0.3)'
  ].join(';');
  
  console.log('%c👋 Hey there!', styles);
  console.log('%cLike what you see? Let\'s build something amazing together!', 'font-size: 14px; color: #6b7280;');
  console.log('%c📧 codewithsid1998@gmail.com', 'font-size: 12px; color: #9ca3af;');
  console.log('%c🌐 https://shahidgul.dev', 'font-size: 12px; color: #9ca3af;');
}

// ===== PERFORMANCE MONITORING =====
if (window.performance && window.performance.timing) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`%c⚡ Page loaded in ${pageLoadTime}ms`, 'color: #10b981; font-weight: bold;');
    }, 0);
  });
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
  console.error('Global error:', e.error);
  // Could send to error tracking service here
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
  // Could send to error tracking service here
});
