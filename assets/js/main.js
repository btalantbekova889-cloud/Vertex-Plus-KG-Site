document.addEventListener('DOMContentLoaded', function () {
  var header = document.getElementById('siteHeader');
  var burger = document.getElementById('burger');
  var nav = document.getElementById('mainNav');

  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  function closeNav() {
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  }

  burger.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  // Contact form (front-end only demo submit)
  var form = document.getElementById('contactForm');
  var success = document.getElementById('formSuccess');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      success.classList.add('show');
      form.reset();
      success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
});
