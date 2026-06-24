/**
 * Block Gallery Video Popup Handler
 * 
 * Manages video preview interactions and popup display
 */

class VideoPopupHandler {
    constructor() {
        this.popup = null;
        this.siteVideoPlayer = null;
        this.externalVideoPlayer = null;
        this.currentVideoSrc = '';
        this.isSiteVideo = false;
        this.init();
    }

    init() {
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.cacheElements();
                this.bindEvents();
            });
        } else {
            this.cacheElements();
            this.bindEvents();
        }
    }

    cacheElements() {
        
        // Create popup if it doesn't exist
        if (!document.getElementById('video-popup-modal')) {
            const popupHTML = `
                <div class="popup-overlay hidden video-popup-overlay" id="video-popup-modal">
                    <div class="popup-wrapper">
                        <div class="container">
                            <div class="popup video-popup">
                                <button class="popup-video-close-btn" aria-label="Close video popup">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                        <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                    </svg>
                                </button>
                                <div class="video-container">
                                    <video id="site-video-player" class="video-player" controls playsinline controlsList="nodownload">
                                        <source src="" type="video/mp4">
                                        Your browser does not support the video tag.
                                    </video>
                                    <iframe id="external-video-player" class="video-iframe" 
                                        src="" 
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowfullscreen>
                                    </iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', popupHTML);
        }

        this.popup = document.getElementById('video-popup-modal');
        this.siteVideoPlayer = document.getElementById('site-video-player');
        this.externalVideoPlayer = document.getElementById('external-video-player');
    }

    bindEvents() {
        // Preview click handlers
        const previews = document.querySelectorAll('.video-preview-wrapper');
        
        previews.forEach((preview, index) => {
            preview.addEventListener('click', (e) => {
                this.openPopup(e, preview);
            });
        });

        // Close button
        if (!this.popup) {
            console.error('[VideoPopupHandler] ERROR: popup is null!');
            return;
        }
        
        const closeBtn = this.popup.querySelector('.popup-video-close-btn');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closePopup();
            });
        }

        // Outside click
        this.popup.addEventListener('click', (e) => {
            if (e.target === this.popup || e.target === this.popup.querySelector('.popup-wrapper')) {
                this.closePopup();
            }
        });

        // ESC key - check that standard popup is not open
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isPopupOpen()) {
                // Don't close if standard popup is open
                const standardPopup = document.querySelector('.popup-overlay:not(.video-popup-overlay)');
                if (standardPopup && standardPopup.classList.contains('show')) {
                    return;
                }

                this.closePopup();
            }
        });

        // Handle outside click on popup-wrapper
        const popupWrapper = this.popup.querySelector('.popup-wrapper');
        if (popupWrapper) {
            popupWrapper.addEventListener('click', (e) => {
                if (e.target === popupWrapper) {
                    this.closePopup();
                }
            });
        }
    }

    openPopup(e, preview) {
        e.preventDefault();
        
        const videoSrc = preview.dataset.src;
        const isSiteVideo = preview.dataset.siteVideo === 'true';

        if (!videoSrc) {
            console.error('[VideoPopupHandler] No video source found!');
            return;
        }

        this.currentVideoSrc = videoSrc;
        this.isSiteVideo = isSiteVideo;

        this.showPopup(videoSrc, isSiteVideo);
    }

    showPopup(videoSrc, isSiteVideo) {
        // Show/hide appropriate player
        if (isSiteVideo) {
            this.siteVideoPlayer.classList.remove('d-none');
            this.siteVideoPlayer.classList.add('d-block');

            this.externalVideoPlayer.classList.remove('d-block');
            this.externalVideoPlayer.classList.add('d-none');

            this.siteVideoPlayer.querySelector('source').src = videoSrc;
            this.siteVideoPlayer.load();

            // Autoplay site video
            setTimeout(() => {
                const playPromise = this.siteVideoPlayer.play();

                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.warn('[VideoPopupHandler] Autoplay was prevented:', error);
                    });
                }
            }, 100);

        } else {
            this.siteVideoPlayer.classList.remove('d-block');
            this.siteVideoPlayer.classList.add('d-none');

            this.externalVideoPlayer.classList.remove('d-none');
            this.externalVideoPlayer.classList.add('d-block');

            this.externalVideoPlayer.src = this.getEmbedUrl(videoSrc);
        }

        // Show popup with animation
        this.popup.classList.remove('hidden');
        this.popup.classList.add('show');
        
        // Only manage overflow if standard popup is not open
        const standardPopup = document.querySelector('.popup-overlay:not(.video-popup-overlay)');
        if (!standardPopup || !standardPopup.classList.contains('show')) {
            document.body.style.overflow = 'hidden';
        }

        // Auto-play if external video
        if (!isSiteVideo) {
            setTimeout(() => {
                this.externalVideoPlayer.focus();
            }, 100);
        }
    }

    closePopup() {
        this.popup.classList.remove('show');
        this.popup.classList.add('hidden');
        
        // Only restore overflow if standard popup is not open
        const standardPopup = document.querySelector('.popup-overlay:not(.video-popup-overlay)');
        if (!standardPopup || !standardPopup.classList.contains('show')) {
            document.body.style.overflow = '';
        }

        // Clear video sources
        this.siteVideoPlayer.querySelector('source').src = '';
        this.siteVideoPlayer.load();
        this.externalVideoPlayer.src = '';

        this.currentVideoSrc = '';
        this.isSiteVideo = false;
    }

    isPopupOpen() {
        const isOpen = this.popup && this.popup.classList.contains('show');
        return isOpen;
    }

    /**
     * Convert video URLs to embeddable formats
     */
    getEmbedUrl(url) {
        // YouTube
        const youtubeMatch = url.match(/(?:youtube(?:-nocookie)?\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/)([^"&?\s]{11})|youtu\.be\/([^"&?\s]{11}))/);
        if (youtubeMatch) {
            const videoId = youtubeMatch[1] || youtubeMatch[2];
            return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        }

        // Vimeo
        const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
        if (vimeoMatch) {
            return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&muted=0&title=0&byline=0&portrait=0`;
        }

        return url;
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new VideoPopupHandler();
    });
} else {
    new VideoPopupHandler();
}
