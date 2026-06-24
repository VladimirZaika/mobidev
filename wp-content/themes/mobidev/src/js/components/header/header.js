document.addEventListener( 'DOMContentLoaded', () => {
    class stickyHeader {
        constructor(headerSelector) {
            this.navbar = document.querySelector(headerSelector);
            this.lastScrollTop = 0;
            this.headerHeight = this.navbar.scrollHeight;

            window.addEventListener('scroll', this.onScroll.bind(this));
            window.addEventListener('load', this.onScroll.bind(this));
        }

        onScroll() {
            let scroll = window.scrollY || document.documentElement.scrollTop;

            if (scroll < 0) scroll = 0;

            if (Math.abs(scroll - this.lastScrollTop) < 2) return;

            if (scroll > this.lastScrollTop) {
                this.navbar.classList.add("scrolled-down");
                this.navbar.classList.remove("scrolled-up");
            }

            else if (scroll === 0) {
                this.navbar.classList.remove("scrolled-down");
                this.navbar.classList.remove("scrolled-up");
            }
            
            else if (scroll < this.lastScrollTop && scroll > 100) {
                this.navbar.classList.remove("scrolled-down");
                this.navbar.classList.add("scrolled-up");
            }

            this.lastScrollTop = scroll;
        }
    };

    if (document.querySelector('header')) {
        new stickyHeader('.header');

        let header = document.querySelector('header');
        let hasChildrenItem = header.querySelectorAll('.menu-item-has-children');

        if (hasChildrenItem.length > 0) {
            hasChildrenItem.forEach(function (item) {
                const link = item.querySelector('a');
                const itemHref = link.getAttribute('href');

                if (itemHref === '#' || itemHref === '') {
                    link.addEventListener('click', function (e) {
                        e.preventDefault();
                    });
                }

                item.addEventListener('pointerdown', function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    hasChildrenItem.forEach(i => {
                        if (i !== item) i.classList.remove('active');
                    });
                    
                    item.classList.toggle('active');
                });
            });

            document.addEventListener('click', function (e) {
                hasChildrenItem.forEach(item => {
                    if (!item.contains(e.target)) {
                        item.classList.remove('active');
                    }
                });
            });

            document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape') {
                    hasChildrenItem.forEach(item => item.classList.remove('active'));
                }
            });
        }
    }
} );