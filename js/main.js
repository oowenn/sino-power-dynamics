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

document.querySelectorAll('.product-gallery').forEach(gallery => {
  const images = gallery.querySelectorAll('.gallery-img');
  const dots = gallery.querySelectorAll('.gallery-dot');
  let current = 0;

  function show(idx) {
    images[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (idx + images.length) % images.length;
    images[current].classList.add('active');
    dots[current].classList.add('active');
  }

  gallery.querySelector('.gallery-prev').addEventListener('click', () => show(current - 1));
  gallery.querySelector('.gallery-next').addEventListener('click', () => show(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));
});
