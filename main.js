/* =============================================
   ARESTAYS ET FILS – JavaScript principal
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar : scroll effect ── */
  const header = document.getElementById('header');
  const scrollTopBtn = document.getElementById('scrollTop');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;

    // Header background on scroll
    if (y > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll-to-top button visibility
    if (y > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── Menu burger (mobile) ── */
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Ferme le menu au clic sur un lien
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // Ferme le menu si clic en dehors
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) {
      burger.classList.remove('active');
      navLinks.classList.remove('open');
    }
  });

  /* ── Active nav link on scroll ── */
  const sections = document.querySelectorAll('section[id], div[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  const observerNav = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observerNav.observe(s));

  /* ── Animation au défilement (AOS maison) ── */
  const aosElements = document.querySelectorAll('[data-aos]');

  const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        aosObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  aosElements.forEach(el => aosObserver.observe(el));

  /* ── Compteur animé (stats) ── */
  const statNumbers = document.querySelectorAll('.stat-number');

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        animateCount(el, target);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => countObserver.observe(el));

  function animateCount(el, target) {
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target;
        clearInterval(interval);
      } else {
        el.textContent = Math.floor(current);
      }
    }, duration / steps);
  }

  /* ── Formulaire de contact ── */
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Validation simple
      const required = form.querySelectorAll('[required]');
      let valid = true;

      required.forEach(field => {
        field.style.borderColor = '';
        if (!field.value.trim()) {
          field.style.borderColor = '#ef4444';
          valid = false;
        }
      });

      // Validation e-mail
      const emailField = form.querySelector('#email');
      if (emailField && emailField.value && !isValidEmail(emailField.value)) {
        emailField.style.borderColor = '#ef4444';
        valid = false;
      }

      if (!valid) {
        // Scroll vers le premier champ invalide
        const firstInvalid = form.querySelector('[style*="border-color: rgb(239"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Simulation d'envoi (à remplacer par fetch vers un backend / Formspree)
      const btnText = form.querySelector('.btn-text');
      const btnLoader = form.querySelector('.btn-loader');
      const submitBtn = form.querySelector('button[type="submit"]');

      submitBtn.disabled = true;
      btnText.hidden = true;
      btnLoader.hidden = false;

      setTimeout(() => {
        form.reset();
        formSuccess.hidden = false;
        submitBtn.disabled = false;
        btnText.hidden = false;
        btnLoader.hidden = true;
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        setTimeout(() => {
          formSuccess.hidden = true;
        }, 8000);
      }, 1500);
    });

    // Reset styles on input
    form.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', () => {
        field.style.borderColor = '';
      });
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* ── Smooth scroll pour tous les liens ancres ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
