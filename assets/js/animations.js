document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll(
    '.animate-on-scroll, .fade-up, .fade-left, .fade-right, .fade-scale, .question__item'
  );

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
  });

  animatedElements.forEach((element) => {
    observer.observe(element);
  });
});
