document.addEventListener('DOMContentLoaded', () => {
    const popupOverlay = document.querySelector('.popup-overlay');

    if (popupOverlay) {
        const popup = popupOverlay.querySelector('.popup');
        const closeBtn = popupOverlay.querySelector('.popup-close');
        
        let popupTimer = null;
        let isFirstAction = true;
        const timerDuration = (wpData?.popupTimer ?? 10) * 1000;

        const closePopup = () => {
            popupOverlay.classList.remove('show');
            popupOverlay.addEventListener('transitionend', () => {
                popupOverlay.classList.add('hidden');
                document.documentElement.classList.remove('lock', 'popup-open');
            }, { once: true });
        };

        const showPopup = () => {
            popupOverlay.classList.remove('hidden');
            setTimeout(() => {
                popupOverlay.classList.add('show');
                document.documentElement.classList.add('lock', 'popup-open');
            }, 10);
        };

        const userAction = () => {
            if (isFirstAction) {
                isFirstAction = false;
                popupTimer = setTimeout(() => {
                    showPopup();
                    removeEventListeners();
                }, timerDuration);
            }
        };

        const removeEventListeners = () => {
            document.removeEventListener('scroll', userAction);
            document.removeEventListener('click', userAction);
            document.removeEventListener('touchstart', userAction);
            document.removeEventListener('mousemove', userAction);
        };

        document.addEventListener('scroll', userAction, { once: false });
        document.addEventListener('click', userAction, { once: false });
        document.addEventListener('touchstart', userAction, { once: false });
        document.addEventListener('mousemove', userAction, { once: false });

        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                closePopup();
            });
        }

        popupOverlay.addEventListener('click', (e) => {
            if (!popup.contains(e.target)) {
                closePopup();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closePopup();
            }
        });
    }
});