document.addEventListener('DOMContentLoaded', () => {
    let page = 2;
    let idenpatentCall = false;
    const loadMoreBtn = document.querySelector('.load-more-btn-wrapper .button');
    const postWrapper = document.querySelector('.post-cards-wrapper');
    const btnWrapper = document.querySelector('.load-more-btn-wrapper');
    const preloaderWrap = btnWrapper?.querySelector('.button-preloader-wrap');

    if (wpData.maxPosts <= wpData.postsPerPage) {
        btnWrapper?.classList.add('d-none');
        return;
    }

    if (loadMoreBtn && postWrapper && btnWrapper) {
        loadMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();

            if (idenpatentCall) return;
            idenpatentCall = true;

            document.body.classList.add('processing');
            preloaderWrap?.classList.add('processing');

            const data = new FormData();
            data.append('action', 'load_more_posts');
            data.append('paged', page);
            data.append('id', wpData.id);
            data.append('taxonomy', wpData.taxonomy);
            data.append('post_type', wpData.postType);

            fetch(wpData.ajaxUrl, {
                method: 'POST',
                body: data,
            })
            .then(response => response.json())
            .then(data => {
                if (data.success && data.data.html) {
                    postWrapper.innerHTML += data.data.html;

                    if (!data.data.has_more) {
                        btnWrapper.classList.add('d-none');
                    } else {
                        page++;
                    }
                } else {
                    btnWrapper.classList.add('d-none');
                }
            })
            .catch(err => {
                console.error('AJAX error:', err);
            })
            .finally(() => {
                document.body.classList.remove('processing');
                preloaderWrap?.classList.remove('processing');
                idenpatentCall = false;
            });
        });
    }
});