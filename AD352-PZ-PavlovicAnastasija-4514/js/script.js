document.addEventListener("DOMContentLoaded", () => {
  // Hamburger menu toggle
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  // Close menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Intersection Observer for animations
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const elements = entry.target.querySelectorAll(
        '.fade-in, .slide-in-left, .slide-in-right, .title-animate, .fade-card, .word-cloud span, .words-fly-in span, .text-rise, .panel-appear, .bar-grow, .thank-title, .thank-text, .thank-scroll'
      );

      if (entry.isIntersecting) {
        elements.forEach((el, index) => {
          setTimeout(() => el.classList.add("active"), index * 100);
        });
      } else {
        elements.forEach(el => el.classList.remove("active"));
      }
    });
  }, { threshold: 0.2 });

  // Observe all sections
  document.querySelectorAll(".stats-section, .life-section, .hero, .thank-you-section, .teaching-section, .site-footer").forEach(section => {
    animationObserver.observe(section);
  });

  // Countdown timer function
  function startCountdownTimer() {
    const endDate = new Date("December 31, 2025 23:59:59").getTime();
    const timerDisplay = document.getElementById("countdownTimer");

    const timerInterval = setInterval(function () {
      const currentTime = new Date().getTime();
      const timeDifference = endDate - currentTime;

      if (timeDifference <= 0) {
        if (timerDisplay) {
          timerDisplay.innerHTML = "Prijave su završene!";
        }
        clearInterval(timerInterval);
        return;
      }

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      if (timerDisplay) {
        timerDisplay.innerHTML = `${days} dana ${hours}č ${minutes}m ${seconds}s`;
      }
    }, 1000);
  }

  // Start the countdown timer
  startCountdownTimer();
});
