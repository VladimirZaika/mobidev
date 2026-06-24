document.addEventListener('DOMContentLoaded', () => {
    const heroWraps = document.querySelectorAll('.section-js .hero-container');

    if (heroWraps.length > 0) {
        function changePosition(wrap) {
            const leftBlock = wrap.querySelector('.left-block-desk');
            const rightBlock = wrap.querySelector('.right-block-desk');
            const leftBlockBtn = leftBlock ? leftBlock.querySelector('.btn-wrapper') : null;

            if (leftBlockBtn && rightBlock && rightBlock.dataset.position === 'mob-left') {
                if (window.innerWidth < 768) {
                    leftBlockBtn.insertAdjacentElement('afterend', rightBlock);
                } else {
                    wrap.appendChild(rightBlock);
                }
            }
        }

        heroWraps.forEach(wrap => {
            changePosition(wrap);
            window.addEventListener('resize', () => changePosition(wrap));
        });
    }
});
