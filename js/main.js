document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');

navToggle.addEventListener('click', () => {
  const isOpen = navList.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navList.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const quoteToggle = document.getElementById('quote-toggle');
const quoteForm = document.getElementById('quote-form');

if (quoteToggle && quoteForm) {
  // Progressive enhancement: collapse the form behind the toggle once JS is running.
  quoteForm.hidden = true;
  quoteToggle.hidden = false;

  quoteToggle.addEventListener('click', () => {
    const willOpen = quoteForm.hidden;
    quoteForm.hidden = !willOpen;
    quoteToggle.setAttribute('aria-expanded', String(willOpen));
    if (willOpen) {
      const firstField = quoteForm.querySelector('input:not([type="hidden"]):not(.honeypot), textarea');
      if (firstField) firstField.focus({ preventScroll: true });
    }
  });
}

if (quoteForm) {
  const status = document.getElementById('form-status');
  const submitBtn = quoteForm.querySelector('.form-submit');

  const setStatus = (message, type) => {
    status.textContent = message;
    status.className = 'form-status' + (type ? ' ' + type : '');
  };

  quoteForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!quoteForm.reportValidity()) return;

    submitBtn.disabled = true;
    setStatus('Sending…', '');

    try {
      const response = await fetch(quoteForm.action, {
        method: 'POST',
        body: new FormData(quoteForm),
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        quoteForm.reset();
        setStatus('Thank you — your request has been sent. Our team will be in touch shortly.', 'success');
      } else {
        const data = await response.json().catch(() => ({}));
        setStatus(data.message || 'Something went wrong. Please email spd@sinopowerdynamics.com.', 'error');
      }
    } catch (err) {
      setStatus('Network error. Please try again or email spd@sinopowerdynamics.com.', 'error');
    } finally {
      submitBtn.disabled = false;
    }
  });
}