/**
 * PORTFOLIO JAVASCRIPT - KESAR SHAMBHU THAKUR
 * Interactive features: typing effect, theme switcher, copy to clipboard, and mail generator
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. TYPING EFFECT IN HERO
  const roles = [
    'Java & Python Development',
    'Full-Stack Web Systems',
    'Exploratory Data Science & EDA',
    'Machine Learning & Analytics',
    'Embedded IoT Prototypes'
  ];

  let currentRoleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typedRoleElem = document.getElementById('typedRole');
  const typeSpeed = 100;
  const eraseSpeed = 50;
  const delayBetweenWords = 2000;

  function typeEffect() {
    if (!typedRoleElem) return;

    const currentString = roles[currentRoleIdx];

    if (isDeleting) {
      typedRoleElem.textContent = currentString.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typedRoleElem.textContent = currentString.substring(0, charIdx + 1);
      charIdx++;
    }

    let timeoutDelay = isDeleting ? eraseSpeed : typeSpeed;

    if (!isDeleting && charIdx === currentString.length) {
      timeoutDelay = delayBetweenWords;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      currentRoleIdx = (currentRoleIdx + 1) % roles.length;
      timeoutDelay = 400;
    }

    setTimeout(typeEffect, timeoutDelay);
  }

  typeEffect();

  // 2. THEME SWITCHER (DARK / LIGHT)
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const htmlRoot = document.documentElement;

  // Retrieve saved preference or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  htmlRoot.setAttribute('data-bs-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-bs-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-bs-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    });
  }

  // 3. COPY EMAIL TO CLIPBOARD WITH BOOTSTRAP TOAST
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const emailToastElem = document.getElementById('emailToast');

  if (copyEmailBtn && emailToastElem) {
    const toastInstance = new bootstrap.Toast(emailToastElem, { delay: 3500 });

    copyEmailBtn.addEventListener('click', async () => {
      const email = 'kesart095@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        toastInstance.show();
      } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        toastInstance.show();
      }
    });
  }

  // 4. CONTACT FORM HANDLER
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('senderName');
      const emailInput = document.getElementById('senderEmail');
      const subjectInput = document.getElementById('messageSubject');
      const messageInput = document.getElementById('messageBody');

      let isValid = true;

      if (!nameInput.value.trim()) {
        nameInput.classList.add('is-invalid');
        isValid = false;
      } else {
        nameInput.classList.remove('is-invalid');
      }

      if (!emailInput.value.trim() || !emailInput.checkValidity()) {
        emailInput.classList.add('is-invalid');
        isValid = false;
      } else {
        emailInput.classList.remove('is-invalid');
      }

      if (!messageInput.value.trim()) {
        messageInput.classList.add('is-invalid');
        isValid = false;
      } else {
        messageInput.classList.remove('is-invalid');
      }

      if (isValid) {
        const subject = encodeURIComponent(subjectInput.value.trim() || `Portfolio Inquiry from ${nameInput.value.trim()}`);
        const body = encodeURIComponent(
          `Hi Kesar,\n\nName: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}\n\nMessage:\n${messageInput.value.trim()}\n`
        );

        // Open mailto client
        window.location.href = `mailto:kesart095@gmail.com?subject=${subject}&body=${body}`;
      }
    });
  }

  // 5. NAVBAR CLOSE ON CLICK (FOR MOBILE)
  const navLinks = document.querySelectorAll('.custom-navbar .nav-link');
  const navbarCollapse = document.getElementById('navbarContent');

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });

  // 6. ANIMATE STAT NUMBERS ON SCROLL
  const countElements = document.querySelectorAll('.count-num');
  let animated = false;

  function runCounters() {
    if (animated) return;

    countElements.forEach((elem) => {
      const target = parseInt(elem.getAttribute('data-val'), 10);
      let current = 0;
      const step = Math.max(1, Math.floor(target / 20));
      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          elem.textContent = target + (elem.getAttribute('data-val') === '12' || elem.getAttribute('data-val') === '3' ? '+' : '');
          clearInterval(interval);
        } else {
          elem.textContent = current;
        }
      }, 50);
    });
    animated = true;
  }

  // Observer for stats section
  const statsBar = document.querySelector('.stats-bar');
  if (statsBar && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        runCounters();
      }
    }, { threshold: 0.3 });
    observer.observe(statsBar);
  } else {
    runCounters();
  }
});
