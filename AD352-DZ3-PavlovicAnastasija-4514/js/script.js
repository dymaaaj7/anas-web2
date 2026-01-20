/*
 * Parallax scrolling efekat
 * Ovaj kod pomera pozadinske slike različitom brzinom
 * dok korisnik skroluje stranicu.
 */

document.addEventListener('DOMContentLoaded', function() {
  initParallaxEffect();
  initMobileMenu();
});

/*
 * Funkcija za inicijalizaciju parallax efekta
 */
function initParallaxEffect() {
  // Čuvamo referencu na window objekat
  var $window = jQuery(window);
  
  // Selektujemo sve sekcije koje imaju atribut data-type="background"
  jQuery('section[data-type="background"]').each(function() {
    var $bgSection = jQuery(this); // čuvamo trenutnu sekciju u promenljivoj
  
    // Kada korisnik skroluje...
    $window.scroll(function() {
      // Računamo pomeraj (pozicija prozora / brzina sekcije)
      var yPos = -($window.scrollTop() / $bgSection.data('speed'));
  
      // Definišemo novu poziciju pozadine
      var coords = '50% ' + yPos + 'px';
  
      // Ažuriramo CSS da se pozadina pomeri
      $bgSection.css({ backgroundPosition: coords });
    });
  });
}

/*
 * Funkcija za hamburger meni na mobilnim uredjajima
 */
function initMobileMenu() {
  var hamburgerBtn = document.querySelector('.hamburger-btn');
  var navMenu = document.querySelector('.nav-menu');
  var navLinks = document.querySelectorAll('.nav-link');
  
  if (hamburgerBtn && navMenu) {
    // Toggle meni kada se klikne na hamburger
    hamburgerBtn.addEventListener('click', function() {
      toggleMenu();
    });
    
    // Zatvori meni kada se klikne na bilo koji link
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        closeMenu();
      });
    });
    
    // Zatvori meni kada se klikne van njega
    document.addEventListener('click', function(event) {
      var isClickInsideNav = navMenu.contains(event.target);
      var isClickOnHamburger = hamburgerBtn.contains(event.target);
      
      if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
        closeMenu();
      }
    });
  }
}

/*
 * Funkcija za otvaranje/zatvaranje menija
 */
function toggleMenu() {
  var hamburgerBtn = document.querySelector('.hamburger-btn');
  var navMenu = document.querySelector('.nav-menu');
  
  hamburgerBtn.classList.toggle('active');
  navMenu.classList.toggle('active');
}

/*
 * Funkcija za zatvaranje menija
 */
function closeMenu() {
  var hamburgerBtn = document.querySelector('.hamburger-btn');
  var navMenu = document.querySelector('.nav-menu');
  
  hamburgerBtn.classList.remove('active');
  navMenu.classList.remove('active');
}

/*
 * Kreiranje HTML5 elemenata za IE (zastarelo, ali ostavljeno za kompatibilnost)
 */
if (typeof document.createElement !== 'undefined') {
  document.createElement("article");
  document.createElement("section");
}
