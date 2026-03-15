document.addEventListener('DOMContentLoaded', function () {
  const coursesSlider = document.querySelector('.courses__slider');
  const reviewsSlider = document.querySelector('.reviews__slider');
  const teamSlider = document.querySelector('.team__slider');

  if (coursesSlider) {
    new Splide('.courses__slider', {
      type: 'slide',
      perPage: 3,
      perMove: 1,
      gap: '24px',
      pagination: false,
      arrows: true,
      autoplay: false,
      interval: 4000,
      pauseOnHover: true,
      pauseOnFocus: true,
      breakpoints: {
        1200: {
          perPage: 2,
        },
        778: {
          perPage: 1,
        }
      },
    }).mount();
  }

  if (teamSlider) {
    new Splide('.team__slider', {
      type: 'slide',
      perPage: 2,
      perMove: 1,
      gap: '20px',
      arrows: true,
      pagination: false,
      breakpoints: {
        992: {
          perPage: 2,
          gap: '16px',
        },
        768: {
          perPage: 1,
          gap: '16px',
        }
      }
    }).mount();
  }

  if (reviewsSlider) {
    const reviewsSplide = new Splide('.reviews__slider', {
      type: 'loop',
      perPage: 3,
      perMove: 1,
      gap: '24px',
      pagination: false,
      arrows: true,
      autoplay: true,
      interval: 5000,
      pauseOnHover: true,
      pauseOnFocus: true,
      breakpoints: {
        992: {
          perPage: 2,
          perMove: 1,
          gap: '24px',
        },
        768: {
          perPage: 1,
        },
      },
    });

    reviewsSplide.mount();

    function updateSoundButton(button, isMuted) {
      if (!button) return;

      if (isMuted) {
        button.classList.remove('is-active');
        button.classList.add('is-muted');
        button.textContent = '🔇';
        button.setAttribute('aria-label', 'Увімкнути звук');
      } else {
        button.classList.remove('is-muted');
        button.classList.add('is-active');
        button.textContent = '🔊';
        button.setAttribute('aria-label', 'Вимкнути звук');
      }
    }

    function muteAllVideos() {
      const allVideoWrappers = reviewsSlider.querySelectorAll('.review-video');

      allVideoWrappers.forEach((wrapper) => {
        const video = wrapper.querySelector('.review-video__media');
        const button = wrapper.querySelector('.review-video__sound');

        if (video) {
          video.muted = true;
        }

        updateSoundButton(button, true);
      });
    }

    muteAllVideos();

    reviewsSlider.addEventListener('click', function (event) {
      const button = event.target.closest('.review-video__sound');
      if (!button) return;

      const wrapper = button.closest('.review-video');
      if (!wrapper) return;

      const video = wrapper.querySelector('.review-video__media');
      if (!video) return;

      const willBeUnmuted = video.muted;

      muteAllVideos();

      if (willBeUnmuted) {
        video.muted = false;

        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              updateSoundButton(button, false);
            })
            .catch(() => {
              video.muted = true;
              updateSoundButton(button, true);
            });
        } else {
          updateSoundButton(button, false);
        }
      } else {
        video.muted = true;
        updateSoundButton(button, true);
      }
    });

    reviewsSplide.on('move', function () {
      muteAllVideos();
    });

    window.reviewsSplide = reviewsSplide;
  }
});
