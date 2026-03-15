document.addEventListener("DOMContentLoaded", () => {
      const modal = document.getElementById("course-modal");

      if (!modal) return;

      const selectedCourseText = document.getElementById("selectedCourseText");
      const selectedCourseInput = document.getElementById("selectedCourseInput");

      function openModal(courseTitle = "") {
            if (selectedCourseText) {
                  selectedCourseText.textContent = courseTitle
                        ? `Обраний курс: ${courseTitle}`
                        : "";
            }

            if (selectedCourseInput) {
                  selectedCourseInput.value = courseTitle;
            }

            modal.classList.add("is-open");
            modal.setAttribute("aria-hidden", "false");
            document.body.classList.add("modal-open");
      }

      function closeModal() {
            modal.classList.remove("is-open");
            modal.setAttribute("aria-hidden", "true");
            document.body.classList.remove("modal-open");
      }

      document.addEventListener("click", (event) => {
            const openButton = event.target.closest("[data-open-modal='course-modal']");
            const closeButton = event.target.closest("[data-close-modal]");

            if (openButton) {
                  const courseTitle = openButton.dataset.courseTitle || "";
                  openModal(courseTitle);
                  return;
            }

            if (closeButton) {
                  closeModal();
            }
      });

      document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && modal.classList.contains("is-open")) {
                  closeModal();
            }
      });
});
