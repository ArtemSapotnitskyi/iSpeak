document.addEventListener("DOMContentLoaded", () => {
      const faqItems = document.querySelectorAll(".question__item");

      if (!faqItems.length) return;

      faqItems.forEach((item) => {
            const question = item.querySelector(".faq__question");

            if (!question) return;

            question.addEventListener("click", () => {
                  const isActive = item.classList.contains("active");

                  faqItems.forEach((faqItem) => {
                        faqItem.classList.remove("active");
                  });

                  if (!isActive) {
                        item.classList.add("active");
                  }
            });
      });
});
