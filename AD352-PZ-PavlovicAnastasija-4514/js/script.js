document.addEventListener("DOMContentLoaded", () => {
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const elements = entry.target.querySelectorAll(
        '.fade-in, .slide-in-left, .slide-in-right, .title-animate, .fade-card, .word-cloud span, .words-fly-in span, .text-rise, .panel-appear, .bar-grow, .thank-title, .thank-text, .fade-in-up'
      );

      if (entry.isIntersecting) {
        elements.forEach((el, index) => {
          setTimeout(() => el.classList.add("active"), index * 120);
        });
        
        if (entry.target.classList.contains('prva')) {
          animateCounter();
          animateGenderBars();
          animateYearBars();
        }
      } else {
        elements.forEach(el => el.classList.remove("active"));
        if (entry.target.classList.contains('prva')) {
          resetCounter();
          resetGenderBars();
          resetYearBars();
        }
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".prva, .cetvrta, .hero, .poslednja, .druga, .futer").forEach(section => {
    observer.observe(section);
  });

  // ===== ANIMATE COUNTER =====
  let counterAnimated = false;
  
  function animateCounter() {
    if (counterAnimated) return;
    counterAnimated = true;
    
    const counterElement = document.querySelector('.counter-number');
    const progressCircle = document.querySelector('.counter-progress');
    
    if (counterElement && progressCircle) {
      // Animate the circle progress
      const circumference = 2 * Math.PI * 90; // r = 90
      setTimeout(() => {
        progressCircle.style.strokeDashoffset = circumference * 0.15; // 85% progress
      }, 200);
      
      // Animate the number
      animateNumber(counterElement, 0, 64, 2000);
    }
  }

  function animateNumber(element, start, end, duration) {
    let current = start;
    const startTime = performance.now();
    
    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 4);
      current = Math.floor(start + (end - start) * easeOut);
      
      element.textContent = current;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }
    
    requestAnimationFrame(animate);
  }

  function resetCounter() {
    counterAnimated = false;
    const counterElement = document.querySelector('.counter-number');
    const progressCircle = document.querySelector('.counter-progress');
    
    if (counterElement) counterElement.textContent = '0';
    if (progressCircle) progressCircle.style.strokeDashoffset = '565.48';
  }

  // ===== ANIMATE GENDER BARS =====
  function animateGenderBars() {
    const genderFills = document.querySelectorAll('.gender-fill');
    genderFills.forEach((fill, index) => {
      setTimeout(() => {
        const percent = fill.getAttribute('data-percent');
        fill.style.width = percent + '%';
        setTimeout(() => {
          fill.classList.add('animated');
        }, 800);
      }, index * 300);
    });
  }

  function resetGenderBars() {
    const genderFills = document.querySelectorAll('.gender-fill');
    genderFills.forEach(fill => {
      fill.style.width = '0';
      fill.classList.remove('animated');
    });
  }

  // ===== ANIMATE YEAR BARS =====
  function animateYearBars() {
    const yearProgressBars = document.querySelectorAll('.year-progress');
    yearProgressBars.forEach((bar, index) => {
      setTimeout(() => {
        const value = bar.getAttribute('data-value');
        bar.style.width = value + '%';
      }, 500 + (index * 150));
    });
  }

  function resetYearBars() {
    const yearProgressBars = document.querySelectorAll('.year-progress');
    yearProgressBars.forEach(bar => {
      bar.style.width = '0';
    });
  }

  // ===== CARD PARALLAX EFFECT =====
  const statCards = document.querySelectorAll('.stat-card');
  statCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 25;
      const rotateY = (centerX - x) / 25;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // ===== CARD TILT ON SCROLL =====
  window.addEventListener('scroll', () => {
    const cards = document.querySelectorAll('.stat-card');
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const centerY = window.innerHeight / 2;
      const cardCenterY = rect.top + rect.height / 2;
      const distance = centerY - cardCenterY;
      const maxDistance = 500;
      
      if (Math.abs(distance) < maxDistance) {
        const tilt = distance / maxDistance * 3;
        card.style.setProperty('--scroll-tilt', `${tilt}deg`);
      }
    });
  });

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ===== WORDS FLYING IN ANIMATION =====
  const wordsFlyInElements = document.querySelectorAll('.words-fly-in');
  wordsFlyInElements.forEach(el => {
    const text = el.innerHTML;
    el.innerHTML = '';
    const words = text.split(' ');
    words.forEach((word, index) => {
      const span = document.createElement('span');
      span.textContent = word + ' ';
      span.style.transitionDelay = `${index * 80}ms`;
      el.appendChild(span);
    });
  });

  // ===== TIMER =====
  function pokreniOdbrojavanje() {
    const kraj = new Date("December 31, 2025 23:59:59").getTime();

    const timer = setInterval(function () {
      const sada = new Date().getTime();
      const razlika = kraj - sada;

      if (razlika <= 0) {
        const tajmerEl = document.getElementById("tajmer");
        if (tajmerEl) {
          tajmerEl.innerHTML = "Prijave su završene!";
        }
        clearInterval(timer);
        return;
      }

      const dani = Math.floor(razlika / (1000 * 60 * 60 * 24));
      const sati = Math.floor((razlika % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minuti = Math.floor((razlika % (1000 * 60 * 60)) / (1000 * 60));
      const sekunde = Math.floor((razlika % (1000 * 60)) / 1000);

      const tajmerEl = document.getElementById("tajmer");
      if (tajmerEl) {
        tajmerEl.innerHTML = `${dani}d ${sati}č ${minuti}m ${sekunde}s`;
      }
    }, 1000);
  }

  pokreniOdbrojavanje();
});
