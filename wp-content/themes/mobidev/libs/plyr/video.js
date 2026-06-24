document.addEventListener("DOMContentLoaded", () => {
    function updateRangeInputs(containerSelector) {
      const ranges = document.querySelectorAll(
        `${containerSelector} input[type="range"]`
      );
      ranges.forEach((input) => {
        const value = parseFloat(input.value);
        const min = parseFloat(input.min) || 0;
        const max = parseFloat(input.max) || 100;
        const percent = ((value - min) / (max - min)) * 100;
        input.style.setProperty("--value", percent);
      });
    }
  
    function setupPlayer(videoSelector, containerSelector, controlsClass) {
      const videoElement = document.querySelectorAll(videoSelector);
      if (videoElement.length > 0) {
        const containers = document.querySelectorAll(containerSelector);
  
        let controlsHTML = `
          <div class="initial-overlay">
            <div class="initial-controls">
              <button type="button" class="plyr__control play-pause-button" data-plyr="play" aria-pressed="false" aria-label="Play">
                <span class="icon icon-play initial-icon"></span>
              </button>
            </div>
          </div>
  
          <div class="plyr__controls ${controlsClass}">
            <div class="flexed-controls">
              <button type="button" class="plyr__control play-pause-button b2b-play-pause-btn" data-plyr="play">
                <svg class="icon-small icon-play" xmlns="http://www.w3.org/2000/svg" width="30" height="29" viewBox="0 0 30 29" fill="none">
                  <rect x="0.307617" y="0.105469" width="29.4359" height="28" rx="14" fill="#333bbb"/>
                  <g clip-path="url(#clip0_2708_14353)">
                    <path d="M11.6924 8.27344V19.9401L20.859 14.1068L11.6924 8.27344Z" fill="#fff"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_2708_14353">
                    <rect width="20" height="20" fill="white" transform="translate(5.02539 4.10547)"/>
                    </clipPath>
                  </defs>
                </svg>
  
                <svg class="icon-small icon-pause" xmlns="http://www.w3.org/2000/svg" width="30" height="29" viewBox="0 0 30 29" fill="none">
                  <rect x="0.307617" y="0.105469" width="29.4359" height="28" rx="14" fill="#333bbb"/>
                  <g clip-path="url(#clip0_2708_15344)">
                    <path d="M10.0254 8.27344H13.3587V19.9401H10.0254V8.27344ZM16.6921 8.27344H20.0254V19.9401H16.6921V8.27344Z" fill="#fff"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_2708_15344">
                    <rect width="20" height="20" fill="white" transform="translate(5.02539 4.10547)"/>
                    </clipPath>
                  </defs>
                </svg>
              </button>
  
              <div class="flexed-player-elements">
                <div class="plyr__time">
                  <span class="plyr__time--current">00:00</span>
                  <span class="plyr__time-separator">/</span>
                  <span class="plyr__time--duration">00:00</span>
                </div>
  
                <div class="plyr__progress">
                  <input data-plyr="seek" type="range" min="0" max="100" step="0.1" value="0" aria-label="Seek">
                </div>
  
                <div class="flexed-player-controls">
                  <div class="volume-control">
                    <button type="button" class="plyr__control" aria-label="Mute" data-plyr="mute">
                        <svg class="icon--not-pressed" role="presentation" xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                          <g clip-path="url(#clip0_2716_7978)">
                            <path d="M3 9.43797V15.438H7L12 20.438V4.43797L7 9.43797H3ZM16.5 12.438C16.5 10.668 15.48 9.14797 14 8.40797V16.458C15.48 15.728 16.5 14.208 16.5 12.438ZM14 3.66797V5.72797C16.89 6.58797 19 9.26797 19 12.438C19 15.608 16.89 18.288 14 19.148V21.208C18.01 20.298 21 16.718 21 12.438C21 8.15797 18.01 4.57797 14 3.66797Z" fill="#333bbb"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_2716_7978">
                            <rect width="24" height="24" fill="white" transform="translate(0 0.4375)"/>
                            </clipPath>
                          </defs>
                        </svg>
  
                        <svg class="icon--pressed" role="presentation" xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                          <g clip-path="url(#clip0_2716_7975)">
                            <path d="M16.5 12.4375C16.5 10.6675 15.48 9.1475 14 8.4075V10.6175L16.45 13.0675C16.48 12.8675 16.5 12.6575 16.5 12.4375ZM19 12.4375C19 13.3775 18.8 14.2575 18.46 15.0775L19.97 16.5875C20.63 15.3475 21 13.9375 21 12.4375C21 8.1575 18.01 4.5775 14 3.6675V5.7275C16.89 6.5875 19 9.2675 19 12.4375ZM4.27 3.4375L3 4.7075L7.73 9.4375H3V15.4375H7L12 20.4375V13.7075L16.25 17.9575C15.58 18.4775 14.83 18.8875 14 19.1375V21.1975C15.38 20.8875 16.63 20.2475 17.69 19.3875L19.73 21.4375L21 20.1675L12 11.1675L4.27 3.4375ZM12 4.4375L9.91 6.5275L12 8.6175V4.4375Z" fill="#333bbb"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_2716_7975">
                            <rect width="24" height="24" fill="white" transform="translate(0 0.4375)"/>
                            </clipPath>
                          </defs>
                        </svg>
                    </button>
  
                    <div class="plyr__volume-range-wrap">
                      <div class="plyr__volume-range">
                        <input class="plyr__volume" data-plyr="volume" type="range" min="0" max="1" step="0.05" value="1" aria-label="Volume">
                      </div>
                    </div>
                  </div>
  
                  <div class="fulscreen-wrapper">
                    <button class="plyr__controls__item plyr__control" type="button" data-plyr="fullscreen" aria-pressed="false">
                      <svg class="icon--pressed" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                        <g clip-path="url(#clip0_2716_7973)">
                          <path d="M4 18.4375C4 19.5375 4.9 20.4375 6 20.4375H10V18.4375H6V14.4375H4V18.4375ZM20 6.4375C20 5.3375 19.1 4.4375 18 4.4375H14V6.4375H18V10.4375H20V6.4375ZM6 6.4375H10V4.4375H6C4.9 4.4375 4 5.3375 4 6.4375V10.4375H6V6.4375ZM20 18.4375V14.4375H18V18.4375H14V20.4375H18C19.1 20.4375 20 19.5375 20 18.4375Z" fill="#333bbb"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_2716_7973">
                          <rect width="24" height="24" fill="white" transform="translate(0 0.4375)"/>
                          </clipPath>
                        </defs>
                      </svg>
  
                      <svg class="icon--not-pressed" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                        <g clip-path="url(#clip0_2716_7973)">
                          <path d="M4 18.4375C4 19.5375 4.9 20.4375 6 20.4375H10V18.4375H6V14.4375H4V18.4375ZM20 6.4375C20 5.3375 19.1 4.4375 18 4.4375H14V6.4375H18V10.4375H20V6.4375ZM6 6.4375H10V4.4375H6C4.9 4.4375 4 5.3375 4 6.4375V10.4375H6V6.4375ZM20 18.4375V14.4375H18V18.4375H14V20.4375H18C19.1 20.4375 20 19.5375 20 18.4375Z" fill="#333bbb"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_2716_7973">
                          <rect width="24" height="24" fill="white" transform="translate(0 0.4375)"/>
                          </clipPath>
                        </defs>
                      </svg>
                      <span class="label--pressed plyr__sr-only">Exit fullscreen</span>
                      <span class="label--not-pressed plyr__sr-only">Enter fullscreen</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;

        const settings = {
          controls: controlsHTML,
          hideControls: false,
          tooltips: { controls: false },
          i18n: {
            play: "Play",
            pause: "Pause",
            volume: "Volume",
            currentTime: "Current time",
            duration: "Duration",
          },
          fullscreen: {
            enabled: true,
            fallback: true,
            iosNative: true,
          },
        };
  
        const players = Array.from(document.querySelectorAll(videoSelector)).map((player) => new Plyr(player, settings));
  
        updateRangeInputs(containerSelector);

        if (containers.length > 0) {
  
          containers.forEach(function(container, index) {
            const initialOverlay = container.querySelector(".initial-overlay");

            if (initialOverlay) {
              initialOverlay.addEventListener("click", () => {
                players[index].play().catch((error) => {
                  console.error("Error playing video:", error);
                });
      
                initialOverlay.style.display = "none";
              });
            }
      
            const playPauseButtons = container.querySelectorAll(".play-pause-button");
            const initialPlayButton = container.querySelectorAll(".initial-play-button");
            const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      
            initialPlayButton.forEach((button) => {
              button.classList.add("paused");
              button.addEventListener("mouseenter", () => {
                if (!isTouchDevice) {
                  button.classList.add("hover-effect");
                }
              });
      
              button.addEventListener("mouseleave", () => {
                if (!isTouchDevice) {
                  button.classList.remove("hover-effect");
                }
              });
            });
      
            playPauseButtons.forEach((button) => {
              button.addEventListener("mouseenter", () => {
                if (!isTouchDevice) {
                  button.classList.add("hover-effect");
                }
              });
      
              button.addEventListener("mouseleave", () => {
                if (!isTouchDevice) {
                  button.classList.remove("hover-effect");
                }
              });
            });

            const ranges = container.querySelectorAll('input[type="range"]');

            ranges.forEach((input) => {
              input.addEventListener("input", () =>
                updateRangeInputs(containerSelector)
              );
            });
      
            players[index].on("play", () => {
              const videoContainer = players[index].elements.container;
              const swiperSlide = videoContainer.closest('.swiper-slide');

              playPauseButtons.forEach((button) => {
                button.classList.remove("paused");
                button.classList.add("playing");
              });
      
              const initialOverlay = container.querySelector(".initial-overlay");
              if (initialOverlay) {
                initialOverlay.style.display = "none";
              }
      
              const customControls = container.querySelector(`.${controlsClass}`);
              if (customControls) {
                customControls.style.display = "block";
              }
            });
      
            players[index].on("pause", () => {
              playPauseButtons.forEach((button) => {
                button.classList.remove("playing");
                button.classList.add("paused");
              });
            });
      
            players[index].on("ready", () => {
              const defaultControls = players[index].elements.controls;
              if (defaultControls) {
                defaultControls.style.display = "none";
              }
      
              const initialOverlay = container.querySelector(".initial-overlay");
              if (initialOverlay) {
                initialOverlay.style.display = "flex";
              }
      
              const customControls = container.querySelector(`.${controlsClass}`);
              if (customControls) {
                // customControls.style.display = "none";
              }
      
              updateRangeInputs(containerSelector);
            });
      
            players[index].on("timeupdate", () => updateRangeInputs(containerSelector));
            players[index].on("volumechange", () => updateRangeInputs(containerSelector));
            players[index].on("seeked", () => updateRangeInputs(containerSelector));
      
            players[index].on("controlshidden", () => {
              players[index].elements.controls.style.opacity = 1;
              players[index].elements.controls.style.visibility = "visible";
            });
      
            players[index].on("enterfullscreen", () => {
              container.classList.add("plyr--fullscreen-active");
            });
      
            players[index].on("exitfullscreen", () => {
              container.classList.remove("plyr--fullscreen-active");
            });
          });
        }

        return players;
        
      }
      return null;
    }
  
    setupPlayer(
      ".itc-video",
      ".home-player-container",
      "post-player-controls"
    );
});
  