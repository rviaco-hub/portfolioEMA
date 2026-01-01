const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.2 });

reveals.forEach(el => observer.observe(el));

let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  const slides = document.querySelectorAll(".slides");
  const dots = document.querySelectorAll(".dot");

  slides.forEach(slide => slide.style.display = "none");
  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;

  slides[slideIndex - 1].style.display = "block";

  dots.forEach(dot => dot.classList.remove("active"));
  dots[slideIndex - 1].classList.add("active");

  setTimeout(showSlides, 5000); // Cambia cada 5s
}

function currentSlide(n) {
  slideIndex = n - 1;
  showSlides();
}

const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-menu');

toggle.addEventListener('click', () => {
  toggle.classList.toggle('active');
  menu.classList.toggle('active');
});

/* Cerrar menú al hacer click */
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    toggle.classList.remove('active');
    menu.classList.remove('active');
  });
});
