let lenis;

const isMobile = window.innerWidth < 768;
const offset = isMobile ? 200 : 400;

// ===== INITIALIZE LENIS SMOOTH SCROLL =====
const initSmoothScrolling = () => {
	// Instantiate the Lenis object with specified properties
	lenis = new Lenis({
        autoRaf: true,
		lerp: 0.1, // Smooth but responsive scroll (balanced between smoothness and responsiveness)
		smoothWheel: true, // Enables smooth scrolling for mouse wheel events
		wheelMultiplier: 1.1,
        direction: 'vertical',// 'vertical' or 'horizontal'
        smoothTouch: true,  // Don't multiply wheel scroll speed       // Animation duration (in seconds)
        easing: 1 - Math.cos((1 * Math.PI) / 2),
        duration: 0,
        infinite: true,
	});

	// Update ScrollTrigger each time the user scrolls
	lenis.on('scroll', () => ScrollTrigger.update());

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000); // Convert seconds to milliseconds for Lenis
    });

    gsap.ticker.lagSmoothing(0);

	// Define a function to run at each animation frame
	const scrollFn = (time) => {
		lenis.raf(time); // Run Lenis' requestAnimationFrame method
		requestAnimationFrame(scrollFn); // Recursively call scrollFn on each frame
	};
	// Start the animation frame loop
	requestAnimationFrame(scrollFn);
};

// Function to handle scroll-triggered animations
const scroll = () => {

    contentElements.forEach((el, position) => {
        
        const isLast = position === totalContentElements-1;

        gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: 'top top',
                end: '+=100%',
                scrub: true
            }
        })
        .to(el, {
            ease: 'none',
            startAt: {filter: 'brightness(100%) contrast(100%)'},
            filter: isLast ? 'none' : 'brightness(60%) contrast(135%)',
            yPercent: isLast ? 0 : -15
        }, 0)
        // Animate the content inner image
        .to(el.querySelector('.content__img'), {
            ease: 'power1.in',
            yPercent: -40,
            rotation: -20
        }, 0);

    });

};

// Initialization function
const init = () => {
    initSmoothScrolling(); // Initialize Lenis for smooth scrolling
    scroll(); // Apply scroll-triggered animations
};

// Function to handle scroll-triggered animations for sticky sections
const initStickyAnimations = () => {
    // Get all sections
    const sections = document.querySelectorAll('section');
    const totalSections = sections.length;

    if (totalSections === 0) return;

    sections.forEach((section, index) => {
        const isLast = index === totalSections - 1;

        // Skip post-cards and numbered-tree sections - they have their own animations
        const isSpecialSection = section.classList.contains('section-numbered-tree') || section.classList.contains('section-cta');

        // Don't pin special sections, don't animate them
        if (isSpecialSection) {
            return;
        }

        // Calculate end value so that pin ends только когда секция полностью выходит из вьюпорта
        let endValue = 'bottom top';
        if (!isLast) {
            endValue = () => {
                // pin длится ровно столько, сколько высота секции (учитывая min-height:100vh и auto height)
                // scrollHeight учитывает весь контент, даже если он больше 100vh
                return '+=' + Math.max(section.scrollHeight, window.innerHeight);
            };
        } else {
            endValue = () => '+=' + Math.max(section.scrollHeight, window.innerHeight);
        }

        // Всегда pin, кроме последней секции
        const shouldPin = !isLast;

        // Create timeline for this section with pin (only for regular sections)
        gsap.to(section, {
            scrollTrigger: {
                trigger: section,
                start: 'bottom bottom', // Start when the bottom of the section hits the bottom of the viewport
                end: endValue,
                scrub: 0.5,
                pin: shouldPin,
                pinSpacing: false,
                markers: false
            },
            ease: 'none',
            yPercent: isLast ? 0 : -15
        });

        // Animate the background image if it exists
        const bgImage = section.querySelector('.content__img, [data-section-bg]');
        if (bgImage) {
            gsap.to(bgImage, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: endValue,
                    scrub: 0.5
                },
                ease: 'power1.in',
                yPercent: -40,
                rotation: -20
            });
        }
    });
};

// ===== TEXT AND CARDS ANIMATION =====
const initTextAndCardsAnimation = () => {
    const textAndCardsSection = document.querySelector('.section-text-and-cards');
    const textAndCardsWrapper = document.querySelector('.text-and-cards-wrapper');
    
    if (!textAndCardsSection || !textAndCardsWrapper) return;

    const windowWidth = window.innerWidth;


        // На десктопе: блок выезжает слева, секция остаётся зафиксирована
    gsap.killTweensOf(textAndCardsWrapper);
    
    gsap.fromTo(
        textAndCardsWrapper,
        { 
            x: -windowWidth * 0.4,
            opacity: 0.5
        },
        {
            x: 0,
            opacity: 1,
            duration: 3,
            scrollTrigger: {
                trigger: textAndCardsWrapper,
                start: `top 70%`,
                end: '+=40%',
                scrub: 1,
            },
        }
    );
};

// ===== POST CARDS ANIMATION =====
const initPostCardsAnimation = () => {
    const postCardsWrapper = document.querySelector('.post-cards-wrapper');
    const postCardsSection = document.querySelector('.section-post-cards');
    
    if (!postCardsWrapper) return;

    const cards = postCardsWrapper.querySelectorAll('.custom-card');
    if (cards.length === 0) return;

    const windowWidth = window.innerWidth;

    if (isMobile) {
        // На мобильных: карточки выезжают справа по одной
        cards.forEach((card, index) => {
            gsap.killTweensOf(card);

            gsap.fromTo(
                card,
                { 
                    x: windowWidth * 0.8, 
                    opacity: 0 
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.6,
                    scrollTrigger: {
                        trigger: postCardsSection,
                        start: `top 70%`,
                        end: `+=10%`,
                        scrub: 1,
                    },
                }
            );
        });
    } else {
        // На десктопе и планшете (768px+): карточки выезжают слева
        gsap.killTweensOf(postCardsWrapper);
        
        gsap.fromTo(
            postCardsWrapper,
            { x: windowWidth * 0.6, opacity: 0.3 },
            {
                x: 0,
                opacity: 1,
                duration: 3,
                scrollTrigger: {
                    trigger: postCardsWrapper,
                    start: `top 70%`,
                    end: '+=40%',
                    scrub: 1,
                },
            }
        );
    }
};

// Initialization function
const initAnimations = () => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger library not loaded');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize Lenis for smooth scrolling
    //initSmoothScrolling();
    
    initStickyAnimations();
    initTextAndCardsAnimation();
    initPostCardsAnimation();
};

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        document.body.classList.remove('loading');
        initAnimations();
    });
} else {
    document.body.classList.remove('loading');
    initAnimations();
}

// Update on window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        gsap.set('*', { clearProps: 'all' });
        initAnimations();
        ScrollTrigger.refresh();
    }, 250);
});

// Update ScrollTrigger when page loads
window.addEventListener('load', () => {
    ScrollTrigger.refresh();
});
