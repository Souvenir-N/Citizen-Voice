/* =========================
   Citizen Voice - Main JS
   ========================= */

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const themeToggle = document.getElementById("themeToggle");

  // Mobile navigation toggle
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });

    // Close menu after clicking a link on mobile
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          navMenu.classList.remove("open");
        }
      });
    });
  }

  // Dark / light mode
  const savedTheme = localStorage.getItem("citizenVoiceTheme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    updateThemeIcon(true);
  } else {
    updateThemeIcon(false);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      const isDark = body.classList.contains("dark-mode");
      localStorage.setItem("citizenVoiceTheme", isDark ? "dark" : "light");
      updateThemeIcon(isDark);
    });
  }

  function updateThemeIcon(isDark) {
    if (!themeToggle) return;
    themeToggle.innerHTML = isDark
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
  }

  // Real-time greeting
  const greetingTarget =
    document.getElementById("greetingText") ||
    document.getElementById("realTimeGreeting");

  if (greetingTarget) {
    const hour = new Date().getHours();
    let greeting = "Good evening";
    if (hour < 12) greeting = "Good morning";
    else if (hour < 18) greeting = "Good afternoon";
    greetingTarget.textContent = `${greeting}, welcome to Citizen Voice`;
  }

  // Simple slider on homepage
  const slides = document.querySelectorAll(".hero-slide");
  if (slides.length > 1) {
    let currentSlide = 0;

    setInterval(() => {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("active");
    }, 4000);
  }

  // Report form validation + modal
  const reportForm = document.getElementById("reportForm");
  const reportMessage = document.getElementById("formMessage");
  const successModal = document.getElementById("successModal");
  const closeModal = document.getElementById("closeModal");

  if (reportForm) {
    reportForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const category = document.getElementById("category").value.trim();
      const description = document.getElementById("description").value.trim();

      // Clear previous message
      if (reportMessage) {
        reportMessage.textContent = "";
      }

      if (!name || !email || !category || !description) {
        alert("Please fill in all required fields before submitting.");
        if (reportMessage) {
          reportMessage.textContent = "All fields are required.";
          reportMessage.style.color = "#dc2626";
        }
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        if (reportMessage) {
          reportMessage.textContent = "Please enter a valid email address.";
          reportMessage.style.color = "#dc2626";
        }
        return;
      }

      // Success
      reportForm.reset();

      if (successModal) {
        successModal.classList.add("show");
        successModal.setAttribute("aria-hidden", "false");
      }

      if (reportMessage) {
        reportMessage.textContent = "Report submitted successfully!";
        reportMessage.style.color = "#16a34a";
      }
    });
  }

  if (closeModal && successModal) {
    closeModal.addEventListener("click", () => {
      successModal.classList.remove("show");
      successModal.setAttribute("aria-hidden", "true");
    });

    successModal.addEventListener("click", (e) => {
      if (e.target === successModal) {
        successModal.classList.remove("show");
        successModal.setAttribute("aria-hidden", "true");
      }
    });
  }

  // Contact form validation
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const contactName = document.getElementById("contactName").value.trim();
      const contactEmail = document.getElementById("contactEmail").value.trim();
      const contactMessage = document.getElementById("contactMessage").value.trim();

      if (!contactName || !contactEmail || !contactMessage) {
        alert("Please complete all contact form fields.");
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(contactEmail)) {
        alert("Please enter a valid email address.");
        return;
      }

      alert("Thank you for contacting Citizen Voice. We will get back to you soon.");
      contactForm.reset();
    });
  }

  // Close mobile nav when clicking outside
  document.addEventListener("click", (e) => {
    if (!navMenu || !menuToggle) return;
    const clickedInsideNav = navMenu.contains(e.target) || menuToggle.contains(e.target);
    if (!clickedInsideNav && window.innerWidth <= 768) {
      navMenu.classList.remove("open");
    }
  });
});