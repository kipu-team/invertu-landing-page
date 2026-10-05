document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // Dirección de la app (único lugar donde se configura)
    // Mientras esté vacía, los botones muestran "Disponible muy pronto".
    // Cuando publiquen la app, pongan aquí su URL, por ejemplo:
    // const APP_URL = "https://app.invertu.pe";
    // ==========================================
    const APP_URL = "";

    const APP_ROUTES = {
        login: "/login",
        register: "/registro",
        terms: "/terminos",
        privacy: "/privacidad"
    };

    const texts = window.invertuTexts || {};
    const storageKey = "invertu-language";
    const statusMessage = document.getElementById("status-message");

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let currentLanguage = "es";

    function t(key) {
        const dictionary = texts[currentLanguage] || texts.es || {};
        return dictionary[key] !== undefined ? dictionary[key] : key;
    }

    // ==========================================
    // Aviso flotante
    // ==========================================
    let statusTimer;

    function showStatus(message) {
        statusMessage.textContent = message;
        statusMessage.classList.add("is-visible");
        window.clearTimeout(statusTimer);
        statusTimer = window.setTimeout(() => {
            statusMessage.classList.remove("is-visible");
        }, 2600);
    }

    // ==========================================
    // Enlaces a la app
    // ==========================================
    document.querySelectorAll("[data-app-link]").forEach((link) => {
        const route = APP_ROUTES[link.dataset.appLink];

        if (APP_URL && route) {
            link.href = APP_URL.replace(/\/$/, "") + route;
            return;
        }

        link.addEventListener("click", (event) => {
            event.preventDefault();
            showStatus(t("cta.soon"));
        });
    });

    // ==========================================
    // Idiomas
    // ==========================================
    const langButtons = document.querySelectorAll(".lang-btn");
    const langMenu = document.getElementById("lang-menu");
    const langToggle = document.getElementById("lang-toggle");
    const langList = document.getElementById("lang-list");
    const langCurrent = document.getElementById("lang-current");

    function applyLanguage(language) {
        if (!texts[language]) language = "es";
        currentLanguage = language;

        document.documentElement.lang = language;

        document.querySelectorAll("[data-i18n]").forEach((element) => {
            element.textContent = t(element.dataset.i18n);
        });

        document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
            element.dataset.i18nAttr.split(",").forEach((pair) => {
                const [attribute, key] = pair.split(":").map((part) => part.trim());
                if (attribute && key) element.setAttribute(attribute, t(key));
            });
        });

        langButtons.forEach((button) => {
            button.setAttribute("aria-pressed", String(button.dataset.lang === language));
        });

        langCurrent.textContent = language.toUpperCase();

        updateMenuLabel();
        renderDots();

        try {
            localStorage.setItem(storageKey, language);
        } catch (error) {
            // Sin localStorage el idioma no se recuerda
        }
    }

    function setLangMenu(isOpen) {
        langList.hidden = !isOpen;
        langToggle.setAttribute("aria-expanded", String(isOpen));
        if (isOpen) langList.querySelector("[aria-pressed='true']").focus();
    }

    langToggle.addEventListener("click", () => setLangMenu(langList.hidden));

    langButtons.forEach((button) => {
        button.addEventListener("click", () => {
            applyLanguage(button.dataset.lang);
            setLangMenu(false);
            langToggle.focus();
        });
    });

    langList.addEventListener("keydown", (event) => {
        const options = Array.from(langButtons);
        const index = options.indexOf(document.activeElement);

        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            const step = event.key === "ArrowDown" ? 1 : -1;
            options[(index + step + options.length) % options.length].focus();
        }

        if (event.key === "Escape") {
            setLangMenu(false);
            langToggle.focus();
        }
    });

    document.addEventListener("click", (event) => {
        if (!langList.hidden && !langMenu.contains(event.target)) setLangMenu(false);
    });

    langMenu.addEventListener("focusout", (event) => {
        if (!langMenu.contains(event.relatedTarget)) {
            langList.hidden = true;
            langToggle.setAttribute("aria-expanded", "false");
        }
    });

    // ==========================================
    // Menú móvil
    // ==========================================
    const menuToggle = document.getElementById("menu-toggle");
    const mainNav = document.getElementById("main-nav");
    const mobileQuery = window.matchMedia("(max-width: 1100px)");

    function updateMenuLabel() {
        const isOpen = mainNav.classList.contains("open");
        menuToggle.setAttribute("aria-label", t(isOpen ? "menu.close" : "menu.open"));
    }

    function setMenu(isOpen) {
        mainNav.classList.toggle("open", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        updateMenuLabel();
    }

    function placeLangMenu() {
        if (mobileQuery.matches) {
            mainNav.appendChild(langMenu);
        } else {
            menuToggle.before(langMenu);
        }
    }

    placeLangMenu();
    mobileQuery.addEventListener("change", placeLangMenu);

    menuToggle.addEventListener("click", () => {
        setMenu(!mainNav.classList.contains("open"));
    });

    mainNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => setMenu(false));
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && mainNav.classList.contains("open")) {
            setMenu(false);
            menuToggle.focus();
        }
    });

    // ==========================================
    // Enlace activo del menú
    // ==========================================
    const mainNavLinks = mainNav.querySelectorAll("a");

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const id = entry.target.id === "hero" ? "inicio" : entry.target.id;
            mainNavLinks.forEach((link) => {
                link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
            });
        });
    }, { rootMargin: "-40% 0px -50% 0px" });

    document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));

    // ==========================================
    // Asistente
    // ==========================================
    const prompts = document.querySelectorAll(".prompt");
    const chatQuestion = document.getElementById("chat-question");
    const chatAnswer = document.getElementById("chat-answer");
    const chatTyping = document.getElementById("chat-typing");
    const mascot = document.querySelector(".mascot");

    let typingTimer;

    function restartAnimation(element, className) {
        element.classList.remove(className);
        void element.offsetWidth;
        element.classList.add(className);
    }

    mascot.addEventListener("animationend", (event) => {
        if (event.animationName === "mascot-bounce") mascot.classList.remove("is-bouncing");
    });

    prompts.forEach((prompt) => {
        prompt.addEventListener("click", () => {
            const number = prompt.dataset.chat;

            prompts.forEach((item) => item.setAttribute("aria-pressed", String(item === prompt)));

            chatQuestion.dataset.i18n = `assistant.q${number}`;
            chatAnswer.dataset.i18n = `assistant.a${number}`;
            chatQuestion.textContent = t(chatQuestion.dataset.i18n);
            restartAnimation(chatQuestion, "is-new");

            if (!prefersReducedMotion) restartAnimation(mascot, "is-bouncing");

            window.clearTimeout(typingTimer);
            chatAnswer.hidden = true;
            chatTyping.hidden = false;

            typingTimer = window.setTimeout(() => {
                chatTyping.hidden = true;
                chatAnswer.textContent = t(chatAnswer.dataset.i18n);
                chatAnswer.hidden = false;
                restartAnimation(chatAnswer, "is-new");
            }, prefersReducedMotion ? 300 : 1100);
        });
    });

    // ==========================================
    // Panel del hero
    // ==========================================
    const DASH_DELAY = 3000;
    const COUNT_DURATION = 800;
    const BAR_MAX = 40000;

    const DASH_START = {
        income: 154000,
        contributions: 32000,
        goal: 68,
        categories: { food: 38000, transport: 18000, subscriptions: 14000, leisure: 20000 }
    };

    const DASH_MOVES = [
        { key: "dash.moveLunch", icon: "fa-utensils", type: "expense", category: "food", amount: 1500 },
        { key: "dash.moveBus", icon: "fa-bus", type: "expense", category: "transport", amount: 400 },
        { key: "dash.moveStreaming", icon: "fa-tv", type: "expense", category: "subscriptions", amount: 2490 },
        { key: "dash.moveTip", icon: "fa-hand-holding-dollar", type: "income", amount: 5000 },
        { key: "dash.moveLaptop", icon: "fa-piggy-bank", type: "goal", amount: 3000, goal: 70 },
        { key: "dash.moveMovies", icon: "fa-film", type: "expense", category: "leisure", amount: 2000 },
        { key: "dash.moveCoffee", icon: "fa-mug-hot", type: "expense", category: "food", amount: 800 }
    ];

    const dashPanel = document.querySelector(".dash");
    const dashMove = document.getElementById("dash-move");
    const dashGoalFill = document.getElementById("dash-goal-fill");
    const shownValues = new Map();

    let dashState = copyDashState(DASH_START);
    let dashStep = 0;
    let dashTimer = null;

    function copyDashState(state) {
        return { ...state, categories: { ...state.categories } };
    }

    function getDashTotals(state) {
        const expenses = Object.values(state.categories).reduce((sum, value) => sum + value, 0);
        return {
            income: state.income,
            expenses,
            contributions: state.contributions,
            available: state.income - expenses - state.contributions,
            goal: state.goal
        };
    }

    function formatMoney(cents) {
        return (cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function countTo(element, target, format) {
        const start = shownValues.has(element) ? shownValues.get(element) : target;
        shownValues.set(element, target);

        if (prefersReducedMotion || start === target) {
            element.textContent = format(target);
            return;
        }

        const startTime = performance.now();

        function frame(now) {
            if (shownValues.get(element) !== target) return;
            const progress = Math.min((now - startTime) / COUNT_DURATION, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            element.textContent = format(Math.round(start + (target - start) * eased));
            if (progress < 1) requestAnimationFrame(frame);
        }

        requestAnimationFrame(frame);
    }

    function renderDash() {
        const totals = getDashTotals(dashState);

        dashPanel.querySelectorAll("[data-dash-value]").forEach((element) => {
            const name = element.dataset.dashValue;
            const format = name === "goal" ? (value) => `${value}%` : (value) => `S/ ${formatMoney(value)}`;
            countTo(element, totals[name], format);
        });

        dashPanel.querySelectorAll("[data-dash-category]").forEach((element) => {
            countTo(element, dashState.categories[element.dataset.dashCategory], formatMoney);
        });

        dashPanel.querySelectorAll("[data-dash-bar]").forEach((bar) => {
            const value = dashState.categories[bar.dataset.dashBar];
            bar.style.height = `${Math.min(value / BAR_MAX, 1) * 100}%`;
        });

        dashGoalFill.style.width = `${dashState.goal}%`;
    }

    function fillMove(move) {
        const sign = move.type === "income" ? "+" : "-";
        dashMove.className = `dash-move dash-move--${move.type}`;
        dashMove.querySelector("i").className = `fa-solid ${move.icon}`;
        dashMove.querySelector("[data-i18n]").dataset.i18n = move.key;
        dashMove.querySelector("[data-i18n]").textContent = t(move.key);
        dashMove.querySelector("strong").textContent = `${sign}S/ ${formatMoney(move.amount)}`;
    }

    function showMove(move) {
        dashMove.classList.remove("is-entering");
        dashMove.classList.add("is-leaving");
        window.setTimeout(() => {
            fillMove(move);
            restartAnimation(dashMove, "is-entering");
        }, 300);
    }

    function applyMove(move) {
        if (move.type === "expense") dashState.categories[move.category] += move.amount;
        if (move.type === "income") dashState.income += move.amount;
        if (move.type === "goal") {
            dashState.contributions += move.amount;
            dashState.goal = move.goal;
        }
    }

    function nextDashStep() {
        dashStep++;

        if (dashStep >= DASH_MOVES.length) {
            dashStep = 0;
            dashState = copyDashState(DASH_START);
        } else {
            applyMove(DASH_MOVES[dashStep]);
        }

        showMove(DASH_MOVES[dashStep]);
        renderDash();
    }

    function startDash() {
        if (dashTimer || prefersReducedMotion) return;
        dashTimer = window.setInterval(nextDashStep, DASH_DELAY);
    }

    function stopDash() {
        window.clearInterval(dashTimer);
        dashTimer = null;
    }

    let dashOnScreen = false;

    function updateDashPlayback() {
        if (dashOnScreen && !document.hidden) {
            startDash();
        } else {
            stopDash();
        }
    }

    fillMove(DASH_MOVES[0]);
    renderDash();

    if (!prefersReducedMotion) {
        new IntersectionObserver((entries) => {
            dashOnScreen = entries[0].isIntersecting;
            updateDashPlayback();
        }, { threshold: 0.2 }).observe(dashPanel);

        document.addEventListener("visibilitychange", updateDashPlayback);
    }

    // ==========================================
    // Testimonios
    // ==========================================
    const testimonials = document.getElementById("testimonios");
    const track = document.getElementById("testimonials-track");
    const dotsContainer = document.getElementById("testimonials-dots");
    const cards = track.querySelectorAll(".testimonial-card");

    const AUTOPLAY_DELAY = 6000;
    const SWIPE_THRESHOLD = 40;

    let perView = 1;
    let pageCount = 1;
    let autoplayTimer;
    let touchStartX = 0;

    function getStep() {
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        return cards[0].getBoundingClientRect().width + gap;
    }

    function getCurrentPage() {
        const maxScroll = track.scrollWidth - track.clientWidth;
        if (track.scrollLeft >= maxScroll - 2) return pageCount - 1;
        return Math.round(track.scrollLeft / (getStep() * perView));
    }

    function goToPage(page) {
        const target = (page + pageCount) % pageCount;
        track.scrollTo({
            left: target * perView * getStep(),
            behavior: prefersReducedMotion ? "auto" : "smooth"
        });
        return target;
    }

    function updateDots() {
        const current = getCurrentPage();
        dotsContainer.querySelectorAll("button").forEach((dot, index) => {
            const isActive = index === current;
            dot.classList.toggle("is-active", isActive);
            dot.setAttribute("aria-current", isActive ? "true" : "false");
            dot.tabIndex = isActive ? 0 : -1;
        });
    }

    function renderDots() {
        perView = Math.max(1, Math.round(track.clientWidth / getStep()));
        pageCount = Math.ceil(cards.length / perView);

        dotsContainer.innerHTML = "";
        dotsContainer.hidden = pageCount < 2;

        for (let index = 0; index < pageCount; index++) {
            const dot = document.createElement("button");
            dot.type = "button";
            dot.className = "dot";
            dot.setAttribute("aria-label", t("testimonials.dot").replace("{n}", index + 1).replace("{total}", pageCount));
            dot.addEventListener("click", () => {
                goToPage(index);
                startAutoplay();
            });
            dotsContainer.appendChild(dot);
        }

        updateDots();
    }

    function stopAutoplay() {
        window.clearInterval(autoplayTimer);
    }

    function startAutoplay() {
        stopAutoplay();
        if (prefersReducedMotion) return;
        autoplayTimer = window.setInterval(() => {
            if (pageCount > 1) goToPage(getCurrentPage() + 1);
        }, AUTOPLAY_DELAY);
    }

    testimonials.addEventListener("pointerenter", (event) => {
        if (event.pointerType === "mouse") stopAutoplay();
    });

    testimonials.addEventListener("pointerleave", (event) => {
        if (event.pointerType === "mouse") startAutoplay();
    });

    testimonials.addEventListener("focusin", stopAutoplay);

    testimonials.addEventListener("focusout", (event) => {
        if (!testimonials.contains(event.relatedTarget)) startAutoplay();
    });

    track.addEventListener("touchstart", (event) => {
        stopAutoplay();
        touchStartX = event.touches[0].clientX;
    }, { passive: true });

    track.addEventListener("touchend", (event) => {
        const deltaX = event.changedTouches[0].clientX - touchStartX;
        if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
            goToPage(getCurrentPage() + (deltaX < 0 ? 1 : -1));
        }
        startAutoplay();
    });

    dotsContainer.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
        event.preventDefault();
        const direction = event.key === "ArrowRight" ? 1 : -1;
        const next = goToPage(getCurrentPage() + direction);
        dotsContainer.querySelectorAll("button")[next].focus();
    });

    let scrollTimer;
    track.addEventListener("scroll", () => {
        window.clearTimeout(scrollTimer);
        scrollTimer = window.setTimeout(updateDots, 80);
    });

    let resizeTimer;
    window.addEventListener("resize", () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(renderDots, 150);
    });

    // ==========================================
    // Animaciones al hacer scroll
    // ==========================================
    if (!prefersReducedMotion) {
        const revealItems = document.querySelectorAll(
            ".benefit-card, .stats-strip, .assistant-copy, .assistant-visual, .testimonials-track, .price-card, .trust-card, .faq, .final-copy, .final-visual"
        );

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            });
        }, { threshold: 0.15 });

        revealItems.forEach((item) => {
            const siblings = Array.from(item.parentElement.children).filter((child) => child.matches(".benefit-card, .price-card, .trust-card"));
            const order = siblings.indexOf(item);
            if (order > 0) item.style.transitionDelay = `${order * 0.1}s`;

            item.classList.add("reveal");
            revealObserver.observe(item);

            item.addEventListener("transitionend", function cleanUp(event) {
                if (event.target !== item || event.propertyName !== "opacity" || !item.classList.contains("is-visible")) return;
                item.classList.remove("reveal", "is-visible");
                item.style.transitionDelay = "";
                item.removeEventListener("transitionend", cleanUp);
            });
        });

        const dash = document.querySelector(".dash");
        dash.classList.add("will-animate");

        new IntersectionObserver((entries, observer) => {
            if (!entries[0].isIntersecting) return;
            dash.classList.add("is-animated");
            observer.disconnect();
        }, { threshold: 0.3 }).observe(dash);
    }

    // ==========================================
    // Idioma inicial
    // ==========================================
    let savedLanguage = null;

    try {
        savedLanguage = localStorage.getItem(storageKey);
    } catch (error) {
        savedLanguage = null;
    }

    applyLanguage(savedLanguage || "es");
    startAutoplay();
});
