// ==========================================
// JavaScript de la landing de Invertu
//
// Instrucciones para el equipo:
// - Los textos están en lang-es.js y lang-en.js (se cargan antes que este archivo)
// - Cada funcionalidad en su propio bloque con un comentario arriba
// - Nombres de variables y funciones en camelCase
// ==========================================

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

    // Si la persona pidió "reducir movimiento" en su sistema, se apagan las animaciones
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
    // Idiomas (data-i18n y data-i18n-attr)
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

        // Formato: data-i18n-attr="atributo:clave, otroAtributo:otraClave"
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
            // Sin localStorage (modo privado): el idioma no se recuerda, pero la página funciona
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

    // Flechas arriba/abajo dentro del menú y Escape para cerrarlo
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

    // Cerrar al hacer clic fuera o al salir con Tab
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

    function updateMenuLabel() {
        const isOpen = mainNav.classList.contains("open");
        menuToggle.setAttribute("aria-label", t(isOpen ? "menu.close" : "menu.open"));
    }

    function setMenu(isOpen) {
        mainNav.classList.toggle("open", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        updateMenuLabel();
    }

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
    // Enlace activo del menú según la sección visible
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
    // Asistente: cada chip cambia el chat
    // ==========================================
    const prompts = document.querySelectorAll(".prompt");
    const chatQuestion = document.getElementById("chat-question");
    const chatAnswer = document.getElementById("chat-answer");
    const chatTyping = document.getElementById("chat-typing");
    const mascot = document.querySelector(".mascot");

    let typingTimer;

    // Reinicia una animación CSS quitando y volviendo a poner su clase
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

            // Primero los puntitos de "escribiendo…", luego la respuesta
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
    // Testimonios: carrusel con circulitos creados según cuántas tarjetas caben
    // ==========================================
    const track = document.getElementById("testimonials-track");
    const dotsContainer = document.getElementById("testimonials-dots");
    const cards = track.querySelectorAll(".testimonial-card");

    let perView = 1;
    let pageCount = 1;

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
        track.scrollTo({ left: page * perView * getStep(), behavior: "smooth" });
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
            dot.addEventListener("click", () => goToPage(index));
            dotsContainer.appendChild(dot);
        }

        updateDots();
    }

    // Flechas izquierda/derecha para moverse entre circulitos
    dotsContainer.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
        event.preventDefault();
        const direction = event.key === "ArrowRight" ? 1 : -1;
        const next = (getCurrentPage() + direction + pageCount) % pageCount;
        goToPage(next);
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
    // Animaciones al hacer scroll (las tarjetas aparecen subiendo)
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
            // Las tarjetas hermanas aparecen una detrás de otra
            const siblings = Array.from(item.parentElement.children).filter((child) => child.matches(".benefit-card, .price-card, .trust-card"));
            const order = siblings.indexOf(item);
            if (order > 0) item.style.transitionDelay = `${order * 0.1}s`;

            item.classList.add("reveal");
            revealObserver.observe(item);

            // Al terminar se quitan las clases para que vuelvan sus efectos de hover
            item.addEventListener("transitionend", function cleanUp(event) {
                if (event.target !== item || event.propertyName !== "opacity" || !item.classList.contains("is-visible")) return;
                item.classList.remove("reveal", "is-visible");
                item.style.transitionDelay = "";
                item.removeEventListener("transitionend", cleanUp);
            });
        });

        // Barras del gráfico y barra de la meta se llenan al aparecer
        const dash = document.querySelector(".dash");
        dash.classList.add("will-animate");

        new IntersectionObserver((entries, observer) => {
            if (!entries[0].isIntersecting) return;
            dash.classList.add("is-animated");
            observer.disconnect();
        }, { threshold: 0.3 }).observe(dash);
    }

    // ==========================================
    // Idioma inicial (el guardado o español)
    // ==========================================
    let savedLanguage = null;

    try {
        savedLanguage = localStorage.getItem(storageKey);
    } catch (error) {
        savedLanguage = null;
    }

    applyLanguage(savedLanguage || "es");
});
