document.addEventListener("DOMContentLoaded", () => {
  const coursesGrid = document.getElementById("coursesGrid");
  const languageFilters = document.getElementById("languageFilters");
  const categoryFilters = document.getElementById("categoryFilters");

  if (!coursesGrid || !languageFilters || !categoryFilters) return;

  const languageLabels = {
    english: "Англійська",
    german: "Німецька",
    french: "Французька",
  };

  const categoryLabels = {
    general: "Загальні",
    profession: "Курси за професіями",
    chatbot: "Готові курси в чат-боті",
    special: "Спеціальні / Цільові",
  };

  const languages = [...new Set(coursesData.map(course => course.language))];

  let activeLanguage = languages[0];
  let activeCategory = null;

  function getCategoriesByLanguage(language) {
    return [
      ...new Set(
        coursesData
          .filter(course => course.language === language)
          .map(course => course.category)
      ),
    ];
  }

  function renderLanguages() {
    languageFilters.innerHTML = "";

    languages.forEach((language) => {
      const isActive = language === activeLanguage ? "is__active" : "";

      const item = `
        <li>
          <button class="filter__btn ${isActive}" type="button" data-language="${language}">
            ${languageLabels[language] || language}
          </button>
        </li>
      `;

      languageFilters.insertAdjacentHTML("beforeend", item);
    });

    const languageButtons = languageFilters.querySelectorAll("[data-language]");

    languageButtons.forEach((button) => {
      button.addEventListener("click", () => {
        activeLanguage = button.dataset.language;

        const categories = getCategoriesByLanguage(activeLanguage);
        activeCategory = categories[0] || null;

        renderLanguages();
        renderCategories();
        filterCourses();
      });
    });
  }

  function renderCategories() {
    categoryFilters.innerHTML = "";

    const categories = getCategoriesByLanguage(activeLanguage);

    if (!activeCategory || !categories.includes(activeCategory)) {
      activeCategory = categories[0] || null;
    }

    categories.forEach((category) => {
      const isActive = category === activeCategory ? "is__active" : "";

      const item = `
        <li>
          <button class="filter__btn ${isActive}" type="button" data-category="${category}">
            ${categoryLabels[category] || category}
          </button>
        </li>
      `;

      categoryFilters.insertAdjacentHTML("beforeend", item);
    });

    const categoryButtons = categoryFilters.querySelectorAll("[data-category]");

    categoryButtons.forEach((button) => {
      button.addEventListener("click", () => {
        activeCategory = button.dataset.category;

        renderCategories();
        filterCourses();
      });
    });
  }

 function renderCourses(courses) {
  coursesGrid.innerHTML = "";

  if (!courses.length) {
    coursesGrid.innerHTML = `<p class="courses-empty">Курси не знайдено.</p>`;
    return;
  }

courses.forEach((course) => {

  const button = course.link
  ? `<a class="course-btn" href="${course.link}" target="_blank">
        ${course.buttonText}
     </a>`
  : `<button
        class="course-btn"
        type="button"
        data-open-modal="course-modal"
        data-course-title="${course.title}"
     >
        ${course.buttonText}
     </button>`;

  const card = `
      <div class="course-card">
        <h3>${course.title}</h3>

        <div class="course-price">
          ${course.price}
        </div>

        <p class="course-description">
          ${course.description}
        </p>

        <div class="course-tags">
          ${course.tags.map(tag => `<span>${tag}</span>`).join("")}
        </div>

        ${button}
      </div>
  `;

  coursesGrid.insertAdjacentHTML("beforeend", card);
});
}

  function filterCourses() {
    const filtered = coursesData.filter((course) => {
      return (
        course.language === activeLanguage &&
        course.category === activeCategory
      );
    });

    renderCourses(filtered);
  }

  const initialCategories = getCategoriesByLanguage(activeLanguage);
  activeCategory = initialCategories[0] || null;

  renderLanguages();
  renderCategories();
  filterCourses();
});
