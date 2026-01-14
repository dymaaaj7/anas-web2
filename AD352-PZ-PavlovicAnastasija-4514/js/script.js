
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const elements = entry.target.querySelectorAll(
        '.fade-in, .slide-in-left, .slide-in-right, .title-animate, .fade-card, .word-cloud span, .words-fly-in span, .text-rise, .panel-appear, .bar-grow, .thank-title, .thank-text, .thank-scroll'
      );

      if (entry.isIntersecting) {
        elements.forEach((el, index) => {
          setTimeout(() => el.classList.add("active"), index * 200);
        });
      } else {
        elements.forEach(el => el.classList.remove("active")); // reset
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll(".prva, .cetvrta, .hero, .poslednja, .druga, .futer").forEach(section => {
    observer.observe(section);
  });


  function pokreniOdbrojavanje() {
    const kraj = new Date("December 31, 2025 23:59:59").getTime();

    const timer = setInterval(function () {
      const sada = new Date().getTime();
      const razlika = kraj - sada;

      if (razlika <= 0) {
        document.getElementById("tajmer").innerHTML = "Prijave su završene!";
        clearInterval(timer);
        return;
      }

      const dani = Math.floor(razlika / (1000 * 60 * 60 * 24));
      const sati = Math.floor((razlika % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minuti = Math.floor((razlika % (1000 * 60 * 60)) / (1000 * 60));
      const sekunde = Math.floor((razlika % (1000 * 60)) / 1000);

      const tajmerEl = document.getElementById("tajmer");
      if (tajmerEl) {
        tajmerEl.innerHTML = `${dani} dana ${sati}č ${minuti}m ${sekunde}s`;
      }
    }, 1000);
  }

  // pokreni tajmer
  pokreniOdbrojavanje();
});
