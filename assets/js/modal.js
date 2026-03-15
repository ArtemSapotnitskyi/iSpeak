document.addEventListener("DOMContentLoaded", () => {
      const openButtons = document.querySelectorAll("[data-open-modal]");

      openButtons.forEach((button) => {
            button.addEventListener("click", () => {
                  const modalId = button.dataset.openModal;
                  const modal = document.getElementById(modalId);

                  if (!modal) return;

                  modal.classList.add("is-open");
                  modal.setAttribute("aria-hidden", "false");
                  document.body.classList.add("modal-open");
            });
      });

      document.querySelectorAll("[data-close-modal]").forEach((element) => {
            element.addEventListener("click", () => {
                  const modal = element.closest(".modal");
                  if (!modal) return;

                  modal.classList.remove("is-open");
                  modal.setAttribute("aria-hidden", "true");
                  document.body.classList.remove("modal-open");
            });
      });

      document.addEventListener("keydown", (event) => {
            if (event.key !== "Escape") return;

            const openedModal = document.querySelector(".modal.is-open");
            if (!openedModal) return;

            openedModal.classList.remove("is-open");
            openedModal.setAttribute("aria-hidden", "true");
            document.body.classList.remove("modal-open");
      });
});
