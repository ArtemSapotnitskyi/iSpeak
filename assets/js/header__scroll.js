document.addEventListener("DOMContentLoaded", () => {
      const header = document.getElementById("siteHeader");

      if (!header) return;

      let lastScrollY = window.scrollY;
      let accumulatedUpScroll = 0;

      const showThreshold = 15;
      const hideThreshold = 10;

      window.addEventListener("scroll", () => {
            const currentScrollY = window.scrollY;
            const delta = currentScrollY - lastScrollY;

            if (currentScrollY <= 0) {
                  header.classList.remove("header__hidden");
                  header.classList.remove("header__scrolled");
                  accumulatedUpScroll = 0;
                  lastScrollY = currentScrollY;
                  return;
            }

            header.classList.add("header__scrolled");

            if (delta > 0) {
                  // scrolling down
                  if (delta >= hideThreshold) {
                        header.classList.add("header__hidden");
                  }
                  accumulatedUpScroll = 0;
            } else if (delta < 0) {
                  // scrolling up
                  accumulatedUpScroll += Math.abs(delta);

                  if (accumulatedUpScroll >= showThreshold) {
                        header.classList.remove("header__hidden");
                  }
            }

            lastScrollY = currentScrollY;
      });
});
