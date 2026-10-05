document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PAGE LOADED
    ===================================================== */

    document.body.classList.add("loaded");


    /* =====================================================
       NAVBAR SCROLL
    ===================================================== */

    const navbar = document.getElementById("navbar");

    function handleNavbar() {

        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    handleNavbar();

    window.addEventListener("scroll", handleNavbar, {
        passive: true
    });


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener("click", () => {

            mobileMenu.classList.toggle("active");
            menuToggle.classList.toggle("active");

            document.body.classList.toggle("menu-open");

        });


        const mobileLinks =
            mobileMenu.querySelectorAll("a");

        mobileLinks.forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("active");
                menuToggle.classList.remove("active");
                document.body.classList.remove("menu-open");

            });

        });

    }


    /* =====================================================
       ESCAPE KEY — CLOSE MOBILE MENU
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            mobileMenu?.classList.remove("active");
            menuToggle?.classList.remove("active");

            document.body.classList.remove("menu-open");

        }

    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("active");

                            observer.unobserve(entry.target);

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

    } else {

        revealElements.forEach(element => {
            element.classList.add("active");
        });

    }


    /* =====================================================
       STAGGER ANIMATION
    ===================================================== */

    const staggerGroups =
        document.querySelectorAll(".stagger");

    if ("IntersectionObserver" in window) {

        const staggerObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("active");

                            observer.unobserve(entry.target);

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );

        staggerGroups.forEach(group => {
            staggerObserver.observe(group);
        });

    }


    /* =====================================================
       HERO ANIMATION
    ===================================================== */

    const heroContent =
        document.querySelector(".hero-content");

    if (heroContent) {

        setTimeout(() => {
            heroContent.classList.add("active");
        }, 250);

    }


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const navbarHeight =
                navbar ? navbar.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";

    document.querySelectorAll(".nav-links a").forEach(link => {

        const href =
            link.getAttribute("href");

        link.classList.remove("active");

        if (
            href === currentPage ||
            (
                currentPage === "" &&
                href === "index.html"
            )
        ) {
            link.classList.add("active");
        }

    });


    /* =====================================================
       IMAGE LAZY LOADING
    ===================================================== */

    const images =
        document.querySelectorAll("img");

    images.forEach((img, index) => {

        /*
         * Keep the first few important images eager
         * for better hero loading.
         */

        if (index > 3) {
            img.loading = "lazy";
        }

        img.decoding = "async";

    });


    /* =====================================================
       IMAGE ERROR HANDLER
    ===================================================== */

    images.forEach(img => {

        img.addEventListener("error", () => {

            img.style.background =
                "linear-gradient(135deg,#171212,#2a1712)";

        });

    });


    /* =====================================================
       ANIMATED COUNTERS
    ===================================================== */

    const counters =
        document.querySelectorAll(
            ".stat-item strong, .testimonial-stat strong"
        );

    function animateCounter(element) {

        const original =
            element.textContent.trim();

        const numberMatch =
            original.match(/[\d.]+/);

        if (!numberMatch) return;

        const target =
            parseFloat(numberMatch[0]);

        if (isNaN(target)) return;

        const suffix =
            original.replace(numberMatch[0], "");

        const duration = 1600;

        const startTime =
            performance.now();

        function updateCounter(currentTime) {

            const progress =
                Math.min(
                    (currentTime - startTime) /
                    duration,
                    1
                );

            const eased =
                1 - Math.pow(1 - progress, 3);

            const current =
                target * eased;

            element.textContent =
                (Number.isInteger(target)
                    ? Math.floor(current)
                    : current.toFixed(1)
                ) + suffix;

            if (progress < 1) {

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                element.textContent =
                    target + suffix;

            }

        }

        requestAnimationFrame(updateCounter);
    }


    if ("IntersectionObserver" in window) {

        const counterObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

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
       HERO PARALLAX
    ===================================================== */

    const heroImages =
        document.querySelectorAll(
            ".hero-background img, .hero-media img"
        );

    if (
        heroImages.length &&
        window.matchMedia("(min-width: 769px)").matches
    ) {

        let ticking = false;

        window.addEventListener("scroll", () => {

            if (ticking) return;

            window.requestAnimationFrame(() => {

                const scroll =
                    window.scrollY;

                heroImages.forEach(image => {

                    image.style.transform =
                        `translateY(${scroll * 0.12}px) scale(1.02)`;

                });

                ticking = false;

            });

            ticking = true;

        }, {
            passive: true
        });

    }


    /* =====================================================
       CARD TILT EFFECT
    ===================================================== */

    const tiltCards =
        document.querySelectorAll(
            ".portfolio-item, .service-card, .team-card, .location-card"
        );

    if (
        window.matchMedia("(min-width: 769px)").matches
    ) {

        tiltCards.forEach(card => {

            card.addEventListener("mousemove", event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    ((y - centerY) / centerY) * -2;

                const rotateY =
                    ((x - centerX) / centerX) * 2;

                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-4px)`;

            });

            card.addEventListener("mouseleave", () => {

                card.style.transform = "";

            });

        });

    }


    /* =====================================================
       MAGNETIC BUTTON EFFECT
    ===================================================== */

    const magneticButtons =
        document.querySelectorAll(
            ".btn"
        );

    if (
        window.matchMedia("(min-width: 769px)").matches
    ) {

        magneticButtons.forEach(button => {

            button.addEventListener("mousemove", event => {

                const rect =
                    button.getBoundingClientRect();

                const x =
                    event.clientX - rect.left -
                    rect.width / 2;

                const y =
                    event.clientY - rect.top -
                    rect.height / 2;

                button.style.transform =
                    `translate(${x * 0.08}px,
                               ${y * 0.08}px)`;

            });

            button.addEventListener("mouseleave", () => {

                button.style.transform = "";

            });

        });

    }


    /* =====================================================
       CURSOR GLOW
    ===================================================== */

    if (
        window.matchMedia("(pointer:fine)").matches
    ) {

        const cursorGlow =
            document.createElement("div");

        cursorGlow.className =
            "cursor-glow";

        document.body.appendChild(cursorGlow);

        let cursorX = 0;
        let cursorY = 0;

        let glowX = 0;
        let glowY = 0;

        window.addEventListener("mousemove", event => {

            cursorX = event.clientX;
            cursorY = event.clientY;

        });

        function animateGlow() {

            glowX +=
                (cursorX - glowX) * 0.12;

            glowY +=
                (cursorY - glowY) * 0.12;

            cursorGlow.style.left =
                `${glowX}px`;

            cursorGlow.style.top =
                `${glowY}px`;

            requestAnimationFrame(
                animateGlow
            );

        }

        animateGlow();

    }


    /* =====================================================
       FORM FOCUS EFFECT
    ===================================================== */

    const formInputs =
        document.querySelectorAll(
            ".form-group input, .form-group textarea, .form-group select"
        );

    formInputs.forEach(input => {

        input.addEventListener("focus", () => {

            input.parentElement.classList.add(
                "focused"
            );

        });

        input.addEventListener("blur", () => {

            input.parentElement.classList.remove(
                "focused"
            );

        });

    });


    /* =====================================================
       ENQUIRY FORM
    ===================================================== */

    const enquiryForm =
        document.getElementById("enquiryForm");

    if (enquiryForm) {

        enquiryForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const submitButton =
                    enquiryForm.querySelector(
                        ".form-submit"
                    );

                if (!submitButton) return;

                const originalText =
                    submitButton.innerHTML;

                submitButton.disabled = true;

                submitButton.innerHTML =
                    "Sending...";

                setTimeout(() => {

                    submitButton.innerHTML =
                        "Enquiry Received ✓";

                    submitButton.style.background =
                        "#2f8f5b";

                    setTimeout(() => {

                        enquiryForm.reset();

                        submitButton.disabled =
                            false;

                        submitButton.innerHTML =
                            originalText;

                        submitButton.style.background =
                            "";

                    }, 1800);

                }, 900);

            }
        );

    }


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const currentYear =
        document.getElementById("currentYear");

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       PAGE TRANSITION
    ===================================================== */

    document.querySelectorAll(
        'a[href$=".html"]'
    ).forEach(link => {

        link.addEventListener("click", event => {

            const href =
                link.getAttribute("href");

            if (
                !href ||
                href.startsWith("#") ||
                link.target === "_blank" ||
                event.ctrlKey ||
                event.metaKey ||
                event.shiftKey ||
                event.altKey
            ) {
                return;
            }

            event.preventDefault();

            document.body.style.opacity = "0";

            setTimeout(() => {

                window.location.href = href;

            }, 250);

        });

    });


    /* =====================================================
       PAGE FADE IN
    ===================================================== */

    window.addEventListener("pageshow", () => {

        document.body.style.opacity = "1";

    });


    /* =====================================================
       PRELOAD HERO IMAGE
    ===================================================== */

    const heroImage =
        document.querySelector(
            ".hero img, .page-hero img"
        );

    if (heroImage && heroImage.src) {

        const preload =
            new Image();

        preload.src =
            heroImage.currentSrc ||
            heroImage.src;

    }

});
