// Address of the Vertex Plus KG API (see backend/README.md). Change this when
// deploying the API somewhere other than a local dotnet run on port 5080.
var API_BASE_URL = 'http://localhost:5080';

// WhatsApp number that receives orders from the contact form (no "+", no spaces).
var WHATSAPP_NUMBER = '996702507188';

function buildWhatsAppUrl(payload) {
  var lines = [
    'Новая заявка с сайта Vertex Plus KG',
    '',
    'Имя: ' + payload.name,
    'Телефон: ' + payload.phone
  ];
  if (payload.material) { lines.push('Интересует: ' + payload.material); }
  if (payload.comment) { lines.push('Комментарий: ' + payload.comment); }
  return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(lines.join('\n'));
}

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

  // Contact form — opens WhatsApp with the order pre-filled, and best-effort
  // saves the lead to the Vertex Plus KG API (backend/) for record-keeping.
  var form = document.getElementById('contactForm');
  var success = document.getElementById('formSuccess');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var payload = {
        name: form.name.value,
        phone: form.phone.value,
        material: form.material.value,
        comment: form.comment.value
      };

      window.open(buildWhatsAppUrl(payload), '_blank', 'noopener');

      success.textContent = 'Открываем WhatsApp — просто нажмите «Отправить» в чате, и заявка придёт нам сразу.';
      success.classList.remove('is-error');
      success.classList.add('show');
      success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      form.reset();

      // Best-effort: also save the lead in the database. Ignored if the API
      // isn't running — WhatsApp above is the primary delivery channel.
      fetch(API_BASE_URL + '/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(function () { /* WhatsApp already handled the delivery */ });
    });
  }
});
