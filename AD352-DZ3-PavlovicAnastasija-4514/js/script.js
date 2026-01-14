/*
 * Parallax scrolling efekat
 * Ovaj kod pomera pozadinske slike različitom brzinom
 * dok korisnik skroluje stranicu.
 */

$(document).ready(function(){
	// Čuvamo referencu na window objekat
	var $window = $(window);
  
	// Selektujemo sve sekcije koje imaju atribut data-type="background"
	$('section[data-type="background"]').each(function(){
	  var $bgobj = $(this); // čuvamo trenutnu sekciju u promenljivoj
  
	  // Kada korisnik skroluje...
	  $(window).scroll(function() {
		// Računamo pomeraj (pozicija prozora / brzina sekcije)
		var yPos = -($window.scrollTop() / $bgobj.data('speed'));
  
		// Definišemo novu poziciju pozadine
		var coords = '50% ' + yPos + 'px';
  
		// Ažuriramo CSS da se pozadina pomeri
		$bgobj.css({ backgroundPosition: coords });
	  });
	});
  });
  
  /* 
 * Create HTML5 elements for IE's sake
 */

document.createElement("article");
document.createElement("section");