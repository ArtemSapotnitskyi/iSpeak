document.addEventListener("DOMContentLoaded", () => {
      const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwbI5IQiInU4bWwhnQa29nT6Mj6N4kgV4ghlPOtZWzljCLsm8yfS1-u7c8-c9AFKd4f/exec";
      const forms = document.querySelectorAll(".js-telegram-form");

      if (!forms.length) return;

      forms.forEach((form) => {
            form.addEventListener("submit", async (event) => {
                  event.preventDefault();

                  const message = form.querySelector(".faq__form__message");
                  const button = form.querySelector('button[type="submit"]');
                  const initialButtonText = button ? button.textContent : "";

                  const nameInput = form.querySelector('[name="name"]');
                  const phoneInput = form.querySelector('[name="phone"]');
                  const commentInput = form.querySelector('[name="comment"]');
                  const courseField = form.querySelector('[name="courseName"]');

                  const name = nameInput ? nameInput.value.trim() : "";
                  const phone = phoneInput ? phoneInput.value.trim() : "";
                  const comment = commentInput ? commentInput.value.trim() : "";
                  const courseName = courseField ? courseField.value.trim() : "";

                  const formType = form.dataset.formType || "Website form";
                  const pageUrl = window.location.href;

                  if (message) {
                        message.textContent = "";
                        message.className = "faq__form__message";
                  }

                  if (!name || !phone || !comment) {
                        if (message) {
                              message.textContent = "Будь ласка, заповніть всі поля.";
                              message.classList.add("error");
                        }
                        return;
                  }

                  const phonePattern = /^[+]?[0-9\s\-()]{8,20}$/;

                  if (!phonePattern.test(phone)) {
                        if (message) {
                              message.textContent = "Будь ласка, введіть коректний номер телефону.";
                              message.classList.add("error");
                        }
                        return;
                  }

                  if (button) {
                        button.disabled = true;
                        button.textContent = "Відправляємо...";
                  }

                  try {
                        const formData = new FormData();
                        formData.append("name", name);
                        formData.append("phone", phone);
                        formData.append("comment", comment);
                        formData.append("courseName", courseName);
                        formData.append("formType", formType);
                        formData.append("pageUrl", pageUrl);

                        await fetch(SCRIPT_URL, {
                              method: "POST",
                              body: formData,
                              mode: "no-cors"
                        });

                        if (message) {
                              message.textContent = "Дякуємо! Ваше питання надіслано.";
                              message.classList.add("success");
                        }

                        form.reset();

                        const selectedCourseText = form.querySelector("#selectedCourseText");
                        const selectedCourseInput = form.querySelector("#selectedCourseInput");

                        if (selectedCourseText) {
                              selectedCourseText.textContent = "";
                        }

                        if (selectedCourseInput) {
                              selectedCourseInput.value = "";
                        }

                        const modal = form.closest(".modal");
                        if (modal) {
                              setTimeout(() => {
                                    modal.classList.remove("is-open");
                                    modal.setAttribute("aria-hidden", "true");
                                    document.body.classList.remove("modal-open");
                              }, 1200);
                        }
                  } catch (error) {
                        console.error("Submit error:", error);

                        if (message) {
                              message.textContent = "Помилка відправки. Спробуйте пізніше.";
                              message.classList.add("error");
                        }
                  } finally {
                        if (button) {
                              button.disabled = false;
                              button.textContent = initialButtonText;
                        }
                  }
            });
      });
});
