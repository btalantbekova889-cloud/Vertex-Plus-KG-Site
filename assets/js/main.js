// Address of the Vertex Plus KG API (see backend/README.md). Change this when
// deploying the API somewhere other than a local dotnet run on port 5080.
var API_BASE_URL = 'http://localhost:5080';

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

  // Contact form — sends the lead to the Vertex Plus KG API (backend/).
  var form = document.getElementById('contactForm');
  var success = document.getElementById('formSuccess');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalBtnText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Отправляем…';
      success.classList.remove('show', 'is-error');

      var payload = {
        name: form.name.value,
        phone: form.phone.value,
        material: form.material.value,
        comment: form.comment.value
      };

      fetch(API_BASE_URL + '/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          if (!res.ok) { throw new Error('Request failed: ' + res.status); }
          success.textContent = 'Спасибо! Заявка отправлена — мы свяжемся с вами в ближайшее время.';
          success.classList.add('show');
          form.reset();
        })
        .catch(function () {
          success.textContent = 'Не удалось отправить форму автоматически. Позвоните нам по +996 702 507 188 или напишите в Instagram vertex.kg.';
          success.classList.add('show', 'is-error');
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
          success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    });
  }
});
