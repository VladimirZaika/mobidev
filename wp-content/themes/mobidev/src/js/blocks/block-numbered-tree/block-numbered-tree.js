document.addEventListener('DOMContentLoaded', () => {
    const NumTreeWraps = document.querySelectorAll('.section-numbered-tree');

    if (NumTreeWraps.length > 0) {
        function activeBlocks() {
            const items = document.querySelectorAll('.numbered-tree-item');
            const activationOffset = window.innerHeight / 2;
            const isWideScreen = window.innerWidth >= 768;

            let lastTreeHeight = 0;

            items.forEach((item, index) => {
                const rect = item.getBoundingClientRect();
                const indexEl = item.querySelector('.index');
                const computedStyle = window.getComputedStyle(item);
                const paddingTop = parseFloat(computedStyle.paddingTop) || 0;
                let contentHeight = rect.height;
                let indexHeight = 48;

                if (indexEl) {
                    indexHeight = indexEl.getBoundingClientRect().height;
                }

                if (item.classList.contains('numbered-tree-item-full')) {
                    if (isWideScreen) {
                        contentHeight = rect.height - paddingTop + (indexHeight / 2);
                    } else {
                        contentHeight = rect.height - paddingTop;
                    }
                }

                if (rect.top <= activationOffset && rect.bottom > 0) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }

                let shouldHighlight = false;

                if (item.classList.contains('numbered-tree-item-full') && isWideScreen) {
                    const blockCenter = rect.top + (contentHeight / 2);
                    
                    if (blockCenter <= activationOffset && (rect.top + contentHeight) > 0) {
                        shouldHighlight = true;
                    }
                } else if (item.classList.contains('numbered-tree-item-full') && !isWideScreen) {
                    if (rect.top <= (activationOffset - paddingTop) && rect.bottom > 0) {
                        shouldHighlight = true;
                    }
                } else {
                    if (rect.top <= activationOffset && rect.bottom > 0) {
                        shouldHighlight = true;
                    }
                }

                if (shouldHighlight) {
                    item.classList.add('index-highlited');
                } else {
                    item.classList.remove('index-highlited');
                }

                const end = rect.height;
                const visibleTop = Math.min(Math.max(-rect.top + activationOffset, 0), end);
                let percent = (visibleTop / end) * 100;
                percent = Math.max(0, Math.min(100, percent));

                if (item.classList.contains('numbered-tree-item-full') && isWideScreen) {
                    if (percent >= 25) {
                        item.classList.add('show');
                    }
                } else if (index !== 0 && !item.classList.contains('numbered-tree-item-full') && isWideScreen) {
                    if ((rect.top - 35) <= activationOffset) {
                        item.classList.add('show');
                    }
                } else {
                    if (shouldHighlight) {
                        item.classList.add('show');
                    }
                }

                item.style.setProperty('--tree-height', `${percent}%`);

                if (index === items.length - 1) {
                    lastTreeHeight = percent;
                }
            });

            const ctaSection = document.querySelector('.section-cta');

            if (ctaSection) {
                if (lastTreeHeight === 100) {
                    ctaSection.classList.add('highlighted');
                } else {
                    ctaSection.classList.remove('highlighted');
                }
            }
        }

        window.addEventListener('DOMContentLoaded', activeBlocks);
        window.addEventListener('scroll', activeBlocks);
        window.addEventListener('resize', activeBlocks);
    }
});
