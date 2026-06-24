document.addEventListener('DOMContentLoaded', () => {
    const copyLinkBtn = document.querySelectorAll('.copy-link-btn');
    const floatMsg = document.querySelector('.float-msg-wrapper');

    if (copyLinkBtn.length > 0) {
        copyLinkBtn.forEach(function (btn) {
            btn.addEventListener('click', function () {
                const url = btn.getAttribute('data-url');
                navigator.clipboard.writeText(url).then(() => {
                    if (floatMsg) {
                        floatMsg.classList.add('active');

                        setTimeout(() => {
                            floatMsg.classList.remove('active');
                        }, 2000);
                    }
                }).catch(() => {
                    btn.textContent = '❌ Failed';
                });
            });
        });
    }
});