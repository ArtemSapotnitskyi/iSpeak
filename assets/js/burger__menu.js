document.addEventListener("DOMContentLoaded", () => {
      const burgerButton = document.getElementById("burgerButton");
      const mobileMenu = document.getElementById("mobileMenu");
      const mobileMenuClose = document.getElementById("mobileMenuClose");
      const mobileLinks = document.querySelectorAll(".mobile__menu__link");
      const modalButtons = document.querySelectorAll("[data-open-modal]");

      if (!burgerButton || !mobileMenu || !mobileMenuClose) return;

      function openMobileMenu() {
            mobileMenu.classList.add("is-open");
            mobileMenu.setAttribute("aria-hidden", "false");
            document.body.classList.add("mobile-menu-open");

            mobileMenuClose.focus();
      }

      function closeMobileMenu() {
            if (mobileMenu.contains(document.activeElement)) {
                  document.activeElement.blur();
            }

            mobileMenu.classList.remove("is-open");
            mobileMenu.setAttribute("aria-hidden", "true");
            document.body.classList.remove("mobile-menu-open");

            burgerButton.focus();
      }

      burgerButton.addEventListener("click", openMobileMenu);
      mobileMenuClose.addEventListener("click", closeMobileMenu);

      mobileLinks.forEach((link) => {
            link.addEventListener("click", () => {
                  closeMobileMenu();
            });
      });

      modalButtons.forEach((button) => {
            button.addEventListener("click", () => {
                  if (mobileMenu.classList.contains("is-open")) {
                        closeMobileMenu();
                  }
            });
      });

      document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && mobileMenu.classList.contains("is-open")) {
                  closeMobileMenu();
            }
      });
});
