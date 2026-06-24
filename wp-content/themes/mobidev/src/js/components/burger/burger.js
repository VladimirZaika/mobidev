document.addEventListener( 'DOMContentLoaded', () => {
    let navLinks = document.querySelectorAll('.header .menu-item a');
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains('lock')) {
            bodyUnlock(delay);
        } else {
            bodyLock(delay);
        }
    };

    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        let stickyHeader = document.querySelector("header._header-scroll");

        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");

            setTimeout(() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = '0px';
                }
                body.style.paddingRight = '0px';
                if(stickyHeader){
                    stickyHeader.style.right = '0px';
                }
                document.documentElement.classList.remove("lock");
            }, delay);
            bodyLockStatus = false;
            setTimeout(function () {
                bodyLockStatus = true;
            }, delay);
        }
    };

    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        let stickyHeader = document.querySelector("header._header-scroll");

        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");

            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.documentElement.scrollWidth + 'px';
            }

            body.style.paddingRight = window.innerWidth - document.documentElement.scrollWidth + 'px';

            if (stickyHeader) {
                stickyHeader.style.right = (window.innerWidth - document.documentElement.scrollWidth) / 2 + 'px';
            }

            document.documentElement.classList.add("lock");
    
            bodyLockStatus = false;
            
            setTimeout(function () {
                bodyLockStatus = true;
            }, delay);
        }
    }

    (function menuInit() {
        if (document.querySelector(".icon-menu")) {
            document.addEventListener("click", function (e) {
                if (bodyLockStatus && e.target.closest('.icon-menu')) {
                    bodyLockToggle();
                    document.documentElement.classList.toggle("menu-open");
                }
            });

            if (navLinks.length > 0) {
                navLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        if (document.documentElement.classList.contains('menu-open')) {
                            bodyLockToggle();
                            document.documentElement.classList.remove("menu-open");
                        }
                    });
                });
            }
        };
    })();
} );