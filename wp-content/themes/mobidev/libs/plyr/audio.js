document.addEventListener('DOMContentLoaded', () => {
    const audioControls = `
    <div class="plyr__controls">
        <button type="button" class="plyr__control" data-plyr="rewind">
            <svg role="presentation" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.83398 6.41602H4.58398V15.5827H2.83398V6.41602ZM5.50065 10.9993L11.9192 6.41602V15.5827L5.50065 10.9993ZM19.2525 6.41602L12.834 10.9993L19.2525 15.5827V6.41602Z" fill="#545454"/>
            </svg>
            <span class="plyr__tooltip" role="tooltip">Rewind {seektime} secs</span>
        </button>
        <button type="button" class="plyr__control" aria-label="Play" data-plyr="play">
            <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-pause"></use></svg>
            <svg class="icon--not-pressed" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_4873_18560)"><path d="M7.33398 4.58398V17.4173L17.4173 11.0007L7.33398 4.58398Z" fill="black"/></g><defs><clipPath id="clip0_4873_18560"><rect width="22" height="22" fill="white"/></clipPath></defs>
            </svg>
            <span class="label--pressed plyr__tooltip" role="tooltip">Pause</span>
            <span class="label--not-pressed plyr__tooltip" role="tooltip">Play</span>
        </button>
        <button type="button" class="plyr__control" data-plyr="fast-forward">
            <svg role="presentation" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.252 15.582L16.502 15.582L16.502 6.41536L18.252 6.41536L18.252 15.582ZM15.5853 10.9987L9.16679 15.582L9.16679 6.41536L15.5853 10.9987ZM1.83345 15.582L8.25195 10.9987L1.83345 6.41536L1.83345 15.582Z" fill="#545454"/>
            </svg>
            <span class="plyr__tooltip" role="tooltip">Forward {seektime} secs</span>
        </button>
        <div class="plyr__time plyr__time--current" aria-label="Current time">00:00</div>
        <div class="plyr__time plyr__time--duration" aria-label="Duration">00:00</div>
        <div class="plyr__progress">
            <input data-plyr="seek" type="range" min="0" max="100" step="0.01" value="0" aria-label="Seek">
            <progress class="plyr__progress__buffer" min="0" max="100" value="0">% buffered</progress>
            <span role="tooltip" class="plyr__tooltip">00:00</span>
        </div>
        <div class="itc-audio__volume-wrap">
            <button type="button" class="plyr__control" aria-label="Mute" data-plyr="mute">
                <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-muted"></use></svg>
                <svg class="icon--not-pressed" role="presentation" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.75 6.2501V11.7501H4.41667L9 16.3334V1.66677L4.41667 6.2501H0.75ZM13.125 9.0001C13.125 7.3776 12.19 5.98427 10.8333 5.30594V12.6851C12.19 12.0159 13.125 10.6226 13.125 9.0001ZM10.8333 0.960938V2.84927C13.4825 3.6376 15.4167 6.09427 15.4167 9.0001C15.4167 11.9059 13.4825 14.3626 10.8333 15.1509V17.0393C14.5092 16.2051 17.25 12.9234 17.25 9.0001C17.25 5.07677 14.5092 1.7951 10.8333 0.960938Z" fill="#000000"/>
                </svg>
            </button>
            <div class="plyr__volume-wrap">
                <div class="plyr__volume">
                    <input data-plyr="volume" type="range" min="0" max="1" step="0.05" value="0.2" autocomplete="off" aria-label="Volume">
                </div>
            </div>
        </div>
        <button type="button" class="plyr__control" data-plyr="restart">
            <svg role="presentation" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_4873_18574)"><path d="M11 6.4V3L6.625 7.25L11 11.5V8.1C13.8962 8.1 16.25 10.3865 16.25 13.2C16.25 16.0135 13.8962 18.3 11 18.3C8.10375 18.3 5.75 16.0135 5.75 13.2H4C4 16.957 7.1325 20 11 20C14.8675 20 18 16.957 18 13.2C18 9.443 14.8675 6.4 11 6.4Z" fill="black"/></g><defs><clipPath id="clip0_4873_18574"><rect width="22" height="22" fill="white"/></clipPath></defs>
            </svg>
            <span class="plyr__tooltip" role="tooltip">Restart</span>
        </button>
    </div>
    `;

    const plyrSettings = {
        controls: audioControls,
        autoplay: true,
        volume: 0.2,
        muted: false,
    };

    let audioElement = document.querySelector('.audio');

    if (audioElement) {    
        const audioPlayer = new Plyr(audioElement, plyrSettings);
        let hasPlayerStarted = false;

        const playOnFirstInteraction = (e) => {
            if (!hasPlayerStarted) {
                hasPlayerStarted = true;

                const playPromise = audioPlayer.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            console.log('Player started successfully');
                        })
                        .catch(error => {
                            console.error('Error starting player:', error);
                        });
                }
                
                document.removeEventListener('pointerdown', playOnFirstInteraction, true);
                document.removeEventListener('mousedown', playOnFirstInteraction, true);
                document.removeEventListener('touchstart', playOnFirstInteraction, true);
            }
        };

        document.addEventListener('pointerdown', playOnFirstInteraction, true);
        document.addEventListener('mousedown', playOnFirstInteraction, true);
        document.addEventListener('touchstart', playOnFirstInteraction, true);
    }
});

