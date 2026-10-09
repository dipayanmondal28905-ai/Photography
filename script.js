/* =========================================================
   CHIRKUT — YOUR WEDDING NOTE
   MASTER JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. PAGE LOAD
    ====================================================== */

    document.body.classList.add("page-loaded");


    /* =====================================================
       02. NAVBAR SCROLL EFFECT
    ====================================================== */

    const header = document.querySelector(".site-header");

    const handleHeaderScroll = () => {

        if (!header) return;

        if (window.scrollY > 60) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    };

    handleHeaderScroll();

    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        { passive: true }
    );


    /* =====================================================
       03. MOBILE MENU
    ====================================================== */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const mobileMenu =
        document.querySelector(".mobile-menu");

    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener("click", () => {

            mobileMenu.classList.toggle("active");

            menuToggle.classList.toggle("active");

            const isOpen =
                mobileMenu.classList.contains("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

        });


        /* Close menu when clicking a link */

        const mobileLinks =
            mobileMenu.querySelectorAll("a");

        mobileLinks.forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("active");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });


        /* Close menu when clicking outside */

        document.addEventListener("click", (event) => {

            if (
                !mobileMenu.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                mobileMenu.classList.remove("active");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }


    /* =====================================================
       04. SCROLL REVEAL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if (revealElements.length) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "active"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -60px 0px"
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    }


    /* =====================================================
       05. HERO CONTENT INITIAL ANIMATION
    ====================================================== */

    const heroContent =
        document.querySelector(
            ".hero-content, .page-hero-content"
        );

    if (heroContent) {

        setTimeout(() => {

            heroContent.classList.add("active");

        }, 250);

    }


    /* =====================================================
       06. SMOOTH INTERNAL LINKS
    ====================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    internalLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       07. ACTIVE NAVIGATION
    ====================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";

    const navLinks =
        document.querySelectorAll(
            ".nav-links .nav-link"
        );

    navLinks.forEach(link => {

        const linkPage =
            link.getAttribute("href");

        if (
            linkPage === currentPage ||
            (
                currentPage === "" &&
                linkPage === "index.html"
            )
        ) {

            link.classList.add("active");

        }

    });


    /* =====================================================
       08. IMAGE LAZY LOADING
    ====================================================== */

    const images =
        document.querySelectorAll("img");

    images.forEach(image => {

        if (!image.hasAttribute("loading")) {

            image.setAttribute(
                "loading",
                "lazy"
            );

        }

    });


    /* =====================================================
       09. ANIMATED COUNTERS
    ====================================================== */

    const counters =
        document.querySelectorAll(
            ".stat-item strong, .testimonial-stat strong"
        );

    const animateCounter = element => {

        const originalText =
            element.textContent.trim();

        /*
         * Handle symbols like:
         * 100+
         * 5.0
         * 100%
         */

        const numericMatch =
            originalText.match(
                /[\d.]+/
            );

        if (!numericMatch) return;

        const target =
            parseFloat(numericMatch[0]);

        if (isNaN(target)) return;

        const prefix =
            originalText.slice(
                0,
                originalText.indexOf(
                    numericMatch[0]
                )
            );

        const suffix =
            originalText.slice(
                originalText.indexOf(
                    numericMatch[0]
                ) + numericMatch[0].length
            );

        const hasDecimal =
            numericMatch[0].includes(".");

        const duration = 1600;

        const startTime =
            performance.now();

        const update = currentTime => {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );

            /*
             * Smooth ease-out
             */

            const eased =
                1 - Math.pow(
                    1 - progress,
                    4
                );

            const currentValue =
                target * eased;

            element.textContent =
                prefix +
                (
                    hasDecimal
                        ? currentValue.toFixed(1)
                        : Math.floor(currentValue)
                ) +
                suffix;

            if (progress < 1) {

                requestAnimationFrame(
                    update
                );

            }

        };

        requestAnimationFrame(update);

    };


    if (counters.length) {

        const counterObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            animateCounter(
                                entry.target
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.6
                }
            );


        counters.forEach(counter => {

            counterObserver.observe(counter);

        });

    }


    /* =====================================================
       10. PARALLAX HERO
    ====================================================== */

    const heroImages =
        document.querySelectorAll(
            ".hero-image, .page-hero-media img"
        );

    if (
        heroImages.length &&
        !window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        window.addEventListener(
            "scroll",
            () => {

                const scroll =
                    window.scrollY;

                heroImages.forEach(image => {

                    const parent =
                        image.closest(
                            ".hero, .page-hero"
                        );

                    if (!parent) return;

                    const rect =
                        parent.getBoundingClientRect();

                    if (
                        rect.bottom < 0 ||
                        rect.top > window.innerHeight
                    ) {
                        return;
                    }

                    const movement =
                        scroll * 0.12;

                    image.style.transform =
                        `translateY(${movement}px) scale(1.05)`;

                });

            },
            { passive: true }
        );

    }


    /* =====================================================
       11. IMAGE HOVER TILT
    ====================================================== */

    const tiltCards =
        document.querySelectorAll(
            ".portfolio-item, .service-card, .commercial-card"
        );

    const isTouchDevice =
        window.matchMedia(
            "(hover: none)"
        ).matches;

    if (!isTouchDevice) {

        tiltCards.forEach(card => {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;

                    const centerX =
                        rect.width / 2;

                    const centerY =
                        rect.height / 2;

                    const rotateX =
                        (y - centerY) /
                        centerY *
                        -2;

                    const rotateY =
                        (x - centerX) /
                        centerX *
                        2;

                    card.style.transform =
                        `perspective(900px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-6px)`;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        });

    }


    /* =====================================================
       12. MAGNETIC BUTTON EFFECT
    ====================================================== */

    const magneticButtons =
        document.querySelectorAll(
            ".btn, .booking-whatsapp, .direct-contact-button"
        );

    if (!isTouchDevice) {

        magneticButtons.forEach(button => {

            button.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        button.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;

                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;

                    button.style.transform =
                        `translate(${x * 0.08}px,
                                   ${y * 0.08}px)`;

                }
            );


            button.addEventListener(
                "mouseleave",
                () => {

                    button.style.transform = "";

                }
            );

        });

    }


    /* =====================================================
       13. CURSOR GLOW
    ====================================================== */

    if (!isTouchDevice) {

        const cursorGlow =
            document.createElement("div");

        cursorGlow.className =
            "cursor-glow";

        document.body.appendChild(
            cursorGlow
        );


        const glowStyle =
            document.createElement("style");

        glowStyle.textContent = `

            .cursor-glow {

                position: fixed;

                width: 180px;
                height: 180px;

                border-radius: 50%;

                pointer-events: none;

                z-index: 9998;

                background:
                    radial-gradient(
                        circle,
                        rgba(255,90,54,0.08)
                        0%,
                        rgba(255,90,54,0.025)
                        35%,
                        transparent 70%
                    );

                transform:
                    translate(-50%, -50%);

                transition:
                    left 0.18s ease-out,
                    top 0.18s ease-out;

                opacity: 0;

            }

            body:hover .cursor-glow {
                opacity: 1;
            }

        `;

        document.head.appendChild(
            glowStyle
        );


        window.addEventListener(
            "mousemove",
            event => {

                cursorGlow.style.left =
                    `${event.clientX}px`;

                cursorGlow.style.top =
                    `${event.clientY}px`;

            },
            { passive: true }
        );

    }


    /* =====================================================
       14. ACTIVE LINK HOVER LINE
    ====================================================== */

    const allLinks =
        document.querySelectorAll(
            "a"
        );

    allLinks.forEach(link => {

        link.addEventListener(
            "mouseenter",
            () => {

                link.classList.add(
                    "link-hover"
                );

            }
        );

        link.addEventListener(
            "mouseleave",
            () => {

                link.classList.remove(
                    "link-hover"
                );

            }
        );

    });


    /* =====================================================
       15. FORM INTERACTION
    ====================================================== */

    const forms =
        document.querySelectorAll(
            ".enquiry-form"
        );

    forms.forEach(form => {

        const inputs =
            form.querySelectorAll(
                "input, textarea, select"
            );


        inputs.forEach(input => {

            input.addEventListener(
                "focus",
                () => {

                    input
                        .closest(".form-group")
                        ?.classList.add(
                            "focused"
                        );

                }
            );


            input.addEventListener(
                "blur",
                () => {

                    input
                        .closest(".form-group")
                        ?.classList.remove(
                            "focused"
                        );

                }
            );

        });


        /*
         * Front-end only form handling.
         * Actual submission can later be connected
         * to Formspree / EmailJS / backend.
         */

        form.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const submitButton =
                    form.querySelector(
                        ".form-submit"
                    );

                if (!submitButton) return;

                const originalText =
                    submitButton.innerHTML;

                submitButton.innerHTML =
                    "Sending...";

                submitButton.disabled =
                    true;


                setTimeout(() => {

                    submitButton.innerHTML =
                        "Enquiry Received ✓";

                    submitButton.style.background =
                        "#1c9b62";


                    setTimeout(() => {

                        form.reset();

                        submitButton.innerHTML =
                            originalText;

                        submitButton.style.background =
                            "";

                        submitButton.disabled =
                            false;

                    }, 2200);

                }, 900);

            }
        );

    });


    /* =====================================================
       16. CURRENT YEAR
    ====================================================== */

    const year =
        new Date().getFullYear();

    const footerTexts =
        document.querySelectorAll(
            ".footer-bottom p"
        );

    footerTexts.forEach(text => {

        text.innerHTML =
            text.innerHTML.replace(
                /©\s*\d{4}/,
                `© ${year}`
            );

    });


    /* =====================================================
       17. IMAGE ERROR HANDLER
    ====================================================== */

    images.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.classList.add(
                    "image-error"
                );

            }
        );

    });


    /* =====================================================
       18. PAGE TRANSITION
    ====================================================== */

    const pageTransitionStyle =
        document.createElement("style");

    pageTransitionStyle.textContent = `

        body {

            opacity: 0;

            transition:
                opacity 0.55s ease;

        }

        body.page-loaded {

            opacity: 1;

        }

        body.page-exiting {

            opacity: 0;

        }

        .image-error {

            min-height: 250px;

            object-fit: cover;

            background:
                linear-gradient(
                    135deg,
                    #1b1513,
                    #30201b
                );

        }

    `;

    document.head.appendChild(
        pageTransitionStyle
    );


    /*
     * Allow page to become visible
     */

    requestAnimationFrame(() => {

        document.body.classList.add(
            "page-loaded"
        );

    });


    /* =====================================================
       19. PAGE EXIT TRANSITION
    ====================================================== */

    const pageLinks =
        document.querySelectorAll(
            "a[href]"
        );

    pageLinks.forEach(link => {

        const href =
            link.getAttribute("href");

        if (
            !href ||
            href.startsWith("#") ||
            href.startsWith("mailto:") ||
            href.startsWith("tel:") ||
            href.startsWith("https://wa.me") ||
            href.startsWith("https://instagram.com") ||
            href.startsWith("https://facebook.com") ||
            link.target === "_blank"
        ) {
            return;
        }


        link.addEventListener(
            "click",
            event => {

                const url =
                    new URL(
                        href,
                        window.location.href
                    );

                if (
                    url.origin !==
                    window.location.origin
                ) {
                    return;
                }

                event.preventDefault();

                document.body.classList.add(
                    "page-exiting"
                );

                setTimeout(() => {

                    window.location.href =
                        url.href;

                }, 450);

            }
        );

    });


    /* =====================================================
       20. ESC KEY — CLOSE MOBILE MENU
    ====================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }

            if (
                mobileMenu &&
                mobileMenu.classList.contains(
                    "active"
                )
            ) {

                mobileMenu.classList.remove(
                    "active"
                );

                menuToggle?.classList.remove(
                    "active"
                );

            }

        }
    );


    /* =====================================================
       21. MOBILE MENU ANIMATION
    ====================================================== */

    const mobileMenuStyle =
        document.createElement("style");

    mobileMenuStyle.textContent = `

        .menu-toggle.active span:nth-child(1) {

            transform:
                translateY(6px)
                rotate(45deg);

        }

        .menu-toggle.active span:nth-child(2) {

            opacity: 0;

            transform:
                translateX(10px);

        }

        .menu-toggle.active span:nth-child(3) {

            transform:
                translateY(-6px)
                rotate(-45deg);

        }

        .form-group.focused label {

            color:
                var(--accent);

        }

    `;

    document.head.appendChild(
        mobileMenuStyle
    );


    /* =====================================================
       22. PRELOAD HERO IMAGE
    ====================================================== */

    const heroSource =
        document.querySelector(
            ".hero-image, .page-hero-media img"
        );

    if (heroSource) {

        const preload =
            new Image();

        preload.src =
            heroSource.currentSrc ||
            heroSource.src;

    }

});

.chatbot-panel[hidden] {
  display: none !important;
}

.chatbot-panel:not([hidden]) {
  display: flex;
}
