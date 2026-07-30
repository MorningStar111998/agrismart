/* AgriSmart BF — interactions */

(function () {
  var reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Apparition des blocs au défilement
  var blocs = document.querySelectorAll(".rev");
  if (reduit || !("IntersectionObserver" in window)) {
    blocs.forEach(function (el) {
      el.classList.add("vu");
    });
  } else {
    var io = new IntersectionObserver(
      function (entrees) {
        entrees.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("vu");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14 },
    );
    blocs.forEach(function (el) {
      io.observe(el);
    });
  }

  // Signature du hero : le relevé descend, le SMS arrive
  var sms = document.getElementById("sms");
  if (sms) {
    if (reduit) {
      sms.classList.add("vu");
    } else {
      setTimeout(function () {
        sms.classList.add("vu");
      }, 1100);
    }
  }

  // Le formulaire n'est pas encore branché sur un service d'envoi
  var f = document.querySelector("form");
  if (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      // TODO : brancher sur Formspree, Netlify Forms, ou votre backend Node
      console.log("Formulaire à brancher");
    });
  }
})();
