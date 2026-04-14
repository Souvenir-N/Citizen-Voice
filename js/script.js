const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const themeToggle = document.getElementById('themeToggle');
const realTime = document.getElementById('realTime');
const navTime = document.getElementById('navTime');
const heroSlides = document.querySelectorAll('.hero-slide');
let heroIndex = 0;
let heroTimer = null;

function updateThemeIcon(isDark) {
  if (!themeToggle) return;
  themeToggle.innerHTML = isDark
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
}

function setTheme(mode) {
  document.body.classList.toggle('dark-mode', mode === 'dark');
  localStorage.setItem('siteTheme', mode);
  updateThemeIcon(mode === 'dark');
}

function initTheme() {
  const savedTheme = localStorage.getItem('siteTheme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
}

function toggleTheme() {
  const isDark = document.body.classList.contains('dark-mode');
  setTheme(isDark ? 'light' : 'dark');
}

function toggleNav() {
  navMenu.classList.toggle('open');
  const icon = menuToggle.querySelector('i');
  if (icon) {
    icon.className = navMenu.classList.contains('open')
      ? 'fa-solid fa-xmark'
      : 'fa-solid fa-bars';
  }
}

function closeNavOnLinkClick() {
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        toggleNav();
      }
    });
  });
}

function updateRealTime() {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const date = now.toLocaleDateString();

  if (realTime) {
    realTime.textContent = `Local time: ${date} ${time}`;
  }
  if (navTime) {
    navTime.textContent = time;
  }
}

function showHeroSlide(index) {
  if (!heroSlides.length || index === heroIndex) return;

  const current = heroSlides[heroIndex];
  const next = heroSlides[index];

  current.classList.remove('active');
  current.classList.add('prev');

  next.classList.remove('prev');
  next.classList.add('active');

  heroIndex = index;
}

function advanceHeroSlider() {
  if (!heroSlides.length) return;
  const nextIndex = (heroIndex + 1) % heroSlides.length;
  showHeroSlide(nextIndex);
}

function initHeroSlider() {
  if (!heroSlides.length) return;

  heroSlides.forEach((slide, index) => {
    slide.classList.remove('active', 'prev');
    if (index === 0) {
      slide.classList.add('active');
    } else {
      slide.classList.add('prev');
    }
  });

  clearInterval(heroTimer);
  heroTimer = setInterval(advanceHeroSlider, 5500);
}

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', toggleNav);
}

if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

initTheme();
updateRealTime();
setInterval(updateRealTime, 1000);
closeNavOnLinkClick();
initHeroSlider();

function validateForm(form) {
  let valid = true;
  let firstInvalid = null;
  const formMessage = form.querySelector('.form-message');
  const fields = form.querySelectorAll('input, textarea, select');

  if (formMessage) {
    formMessage.textContent = '';
    formMessage.classList.remove('error-message');
  }

  fields.forEach(field => {
    field.classList.remove('invalid');
    field.setCustomValidity('');

    if (!field.checkValidity()) {
      valid = false;
      if (!firstInvalid) firstInvalid = field;

      field.classList.add('invalid');

      if (field.validity.valueMissing) {
        field.setCustomValidity('This field is required.');
      } else if (field.validity.typeMismatch) {
        if (field.type === 'email') {
          field.setCustomValidity('Please enter a valid email address.');
        } else {
          field.setCustomValidity('Please enter a valid value.');
        }
      } else if (field.validity.tooShort) {
        field.setCustomValidity(`Please enter at least ${field.minLength} characters.`);
      } else if (field.validity.patternMismatch) {
        field.setCustomValidity('Please follow the required format.');
      }

      field.reportValidity();
    }
  });

  if (!valid && formMessage) {
    formMessage.textContent = 'Please fix the highlighted fields before submitting.';
    formMessage.classList.add('error-message');
  }

  if (firstInvalid) {
    firstInvalid.focus();
  }

  return valid;
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('form').forEach(form => {
    form.setAttribute('novalidate', '');

    form.addEventListener('submit', event => {
      if (!validateForm(form)) {
        event.preventDefault();
      }
    });

    form.addEventListener('invalid', event => {
      event.preventDefault();
      event.target.classList.add('invalid');
    }, true);

    form.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('input', () => {
        if (field.validity.valid) {
          field.classList.remove('invalid');
          field.setCustomValidity('');
        }
      });
    });
  });
});