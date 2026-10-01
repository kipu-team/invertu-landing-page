document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".main-nav a, .footer-nav a");
    const mainNavLinks = document.querySelectorAll(".main-nav a");
    const sections = document.querySelectorAll("main section[id]");
    const languageSelect = document.getElementById("language-select");
    const statusMessage = document.getElementById("status-message");
    const assistantResponse = document.getElementById("assistant-response");
    const assistantResponseText = document.getElementById("assistant-response-text");
    const supportModal = document.getElementById("support-modal");
    const supportClose = document.getElementById("support-close");
    const supportForm = document.getElementById("support-form");
    const supportStatus = document.getElementById("support-status");

    const translations = {
        es: {
            documentTitle: "InvertU — Entiende tu dinero. Decide mejor.",
            nav: ["Inicio", "Beneficios", "Asistente", "Planes", "Testimonios", "Ayuda"],
            login: "Iniciar sesión",
            signup: "Crear cuenta gratis",
            badge: "GESTIÓN FINANCIERA PARA ESTUDIANTES",
            heroTitle: "Entiende tu dinero.",
            heroAccent: "Decide mejor.",
            heroDescription: "Organiza tus movimientos, planifica tus metas y toma el control de tu vida financiera de forma simple y segura, sin complicaciones bancarias.",
            explore: "Explorar funciones",
            checklist: ["Acceso desde tu navegador", "Registro simple y rápido", "Información siempre organizada"],
            benefitsTitle: "Más claridad para tomar mejores decisiones",
            benefitsLead: "Entendemos que manejar dinero como estudiante puede ser confuso. InvertU te da las herramientas para que sepas exactamente dónde estás parado.",
            benefits: [
                ["Control mensual", "Conoce tu balance real al instante, separando lo que tienes de lo que ya gastaste."],
                ["Análisis de gastos", "Categoriza automáticamente tus consumos para descubrir fugas de dinero."],
                ["Planificación de metas", "Define objetivos de ahorro y observa tu progreso de manera visual e inspiradora."],
                ["Seguimiento de pagos", "Identifica tus suscripciones recurrentes para no pagar de más por descuidos."]
            ],
            stats: ["Disponible Hoy", "Gastado (Mes)", "Meta Principal", "Suscripciones"],
            organize: "Comenzar a organizarme",
            assistantBadge: "NUEVO ASISTENTE INTELIGENTE",
            assistantTitle: "Consulta tus finanzas usando palabras simples",
            assistantDescription: "Habla con tu dinero. Pregúntale a InvertU sobre tus gastos o dile que registre un nuevo movimiento como si chatearas con un amigo.",
            prompts: ["¿Cuánto gasté este mes en comida?", "Añade 15 soles en transporte de hoy", "¿Me alcanza para salir el viernes?"],
            assistantButton: "Conocer el asistente",
            testimonialsTitle: "¿Qué dicen los estudiantes sobre InvertU?",
            testimonialsLead: "Miles de jóvenes ya están tomando el control de sus finanzas con nosotros.",
            testimonialsRoles: ["Estudiante de Economía", "Estudiante de Ingeniería", "Estudiante de Diseño"],
            testimonials: [
                "Por fin entiendo a dónde se va mi dinero cada mes. El asistente me ayuda a mantener mi registro al día sin esfuerzo.",
                "Ahorrar para mi nueva laptop parecía imposible hasta que empecé a usar las metas de InvertU. ¡Ver el progreso me motiva a seguir!",
                "Me encanta cómo puedo ver mis gastos diarios de forma tan clara. Es súper práctico y fácil de usar para organizar mi presupuesto sin complicaciones."
            ],
            plansTitle: "Elige tu plan",
            plansLead: "Empieza gratis, mejora cuando lo necesites. Los precios y beneficios son referenciales.",
            freePlan: "Plan Gratuito",
            premiumPlan: "Plan Premium",
            perMonth: "/mes",
            recommended: "RECOMENDADO",
            freeFeatures: ["Registro manual de movimientos", "Categorías básicas y dashboard", "1 Meta de ahorro activa", "Asistente inteligente (consultas básicas)"],
            premiumFeatures: ["Metas de ahorro ilimitadas", "Detección asistida de suscripciones", "Simulaciones y proyecciones", "Reportes avanzados e historial completo"],
            trustTitle: "Tu información permanece bajo tu control",
            trust: [
                ["Sin credenciales bancarias", "Nunca te pediremos tu clave de internet, token o PIN del banco."],
                ["Tú confirmas todo", "InvertU sugiere, tú decides. Tienes el control total de los registros."],
                ["Plataforma Web", "Accede desde cualquier navegador sin descargar apps pesadas."]
            ],
            faqTitle: "Preguntas Frecuentes",
            faqQuestions: ["¿Se conecta automáticamente a mi banco?", "¿Por qué piden números de tarjeta?"],
            faqAnswers: [
                "No. InvertU no se conecta a tu banco ni te pide credenciales bancarias. Tú registras tus movimientos y el asistente te ayuda a organizarlos.",
                "No los pedimos para usar la plataforma. El plan gratuito no requiere ningún dato de pago, y nunca te solicitaremos claves, tokens ni PIN."
            ],
            support: "Contactar soporte",
            finalTitle: "Empieza a tomar decisiones con información más clara",
            terms: "T&C",
            privacy: "Privacy",
            footerCopy: "© 2026 InvertU. Empoderando el futuro financiero estudiantil.",
            language: "Idioma",
            languageEs: "Español",
            languageEn: "English",
            modalTitle: "Contactar soporte",
            modalName: "Nombre",
            modalEmail: "Correo",
            modalMessage: "Mensaje",
            modalSend: "Enviar mensaje",
            modalClose: "Cerrar",
            modalNotice: "El formulario de soporte estará disponible próximamente.",
            available: "Disponible próximamente",
            assistantResponses: [
                "Este mes llevas S/ 180.00 en comida.",
                "He preparado el registro de S/ 15.00 en transporte. ¿Quieres confirmarlo?",
                "Según tu saldo disponible, tienes S/ 320.00. Revisa tus gastos previstos antes de decidir."
            ]
        },
        en: {
            documentTitle: "InvertU — Understand your money. Decide better.",
            nav: ["Home", "Benefits", "Assistant", "Plans", "Testimonials", "Help"],
            login: "Sign in",
            signup: "Create free account",
            badge: "FINANCIAL MANAGEMENT FOR STUDENTS",
            heroTitle: "Understand your money.",
            heroAccent: "Decide better.",
            heroDescription: "Organize your transactions, plan your goals and take control of your financial life in a simple and secure way, without banking complications.",
            explore: "Explore features",
            checklist: ["Access from your browser", "Simple and fast registration", "Information always organized"],
            benefitsTitle: "More clarity for better decisions",
            benefitsLead: "We understand that managing money as a student can be confusing. InvertU gives you the tools to know exactly where you stand.",
            benefits: [
                ["Monthly control", "Know your real balance instantly, separating what you have from what you have already spent."],
                ["Spending analysis", "Automatically categorize your spending to discover money leaks."],
                ["Goal planning", "Set savings goals and track your progress in a visual and motivating way."],
                ["Payment tracking", "Identify recurring subscriptions so you do not overpay because of oversights."]
            ],
            stats: ["Available Today", "Spent (Month)", "Main Goal", "Subscriptions"],
            organize: "Start organizing",
            assistantBadge: "NEW SMART ASSISTANT",
            assistantTitle: "Ask about your finances in simple words",
            assistantDescription: "Talk to your money. Ask InvertU about your spending or tell it to record a new transaction as if you were chatting with a friend.",
            prompts: ["How much did I spend on food this month?", "Add 15 soles in transportation today", "Can I afford to go out on Friday?"],
            assistantButton: "Meet the assistant",
            testimonialsTitle: "What do students say about InvertU?",
            testimonialsLead: "Thousands of young people are already taking control of their finances with us.",
            testimonialsRoles: ["Economics Student", "Engineering Student", "Design Student"],
            testimonials: [
                "I finally understand where my money goes each month. The assistant helps me keep my records up to date effortlessly.",
                "Saving for my new laptop seemed impossible until I started using InvertU goals. Seeing the progress motivates me to keep going!",
                "I love how clearly I can see my daily spending. It is practical and easy to use for organizing my budget without complications."
            ],
            plansTitle: "Choose your plan",
            plansLead: "Start for free and upgrade when you need it. Prices and benefits are for reference.",
            freePlan: "Free Plan",
            premiumPlan: "Premium Plan",
            perMonth: "/month",
            recommended: "RECOMMENDED",
            freeFeatures: ["Manual transaction entry", "Basic categories and dashboard", "1 active savings goal", "Smart assistant (basic queries)"],
            premiumFeatures: ["Unlimited savings goals", "Assisted subscription detection", "Simulations and projections", "Advanced reports and full history"],
            trustTitle: "Your information stays under your control",
            trust: [
                ["No banking credentials", "We will never ask for your internet banking password, token or bank PIN."],
                ["You confirm everything", "InvertU suggests, you decide. You have full control of your records."],
                ["Web platform", "Access from any browser without downloading heavy apps."]
            ],
            faqTitle: "Frequently Asked Questions",
            faqQuestions: ["Does it connect automatically to my bank?", "Why do you ask for card numbers?"],
            faqAnswers: [
                "No. InvertU does not connect to your bank or ask for banking credentials. You record your transactions and the assistant helps you organize them.",
                "We do not ask for them to use the platform. The free plan does not require payment information, and we will never ask for passwords, tokens or PINs."
            ],
            support: "Contact support",
            finalTitle: "Start making decisions with clearer information",
            terms: "Terms & Conditions",
            privacy: "Privacy",
            footerCopy: "© 2026 InvertU. Empowering the financial future of students.",
            language: "Language",
            languageEs: "Español",
            languageEn: "English",
            modalTitle: "Contact support",
            modalName: "Name",
            modalEmail: "Email",
            modalMessage: "Message",
            modalSend: "Send message",
            modalClose: "Close",
            modalNotice: "The support form will be available soon.",
            available: "Available soon",
            assistantResponses: [
                "You have spent S/ 180.00 on food this month.",
                "I prepared a S/ 15.00 transportation entry. Would you like to confirm it?",
                "Based on your available balance, you have S/ 320.00. Review your planned expenses before deciding."
            ]
        }
    };

    let currentLanguage = localStorage.getItem("invertu-language") || "es";

    function showStatus(message) {
        statusMessage.textContent = message;
        statusMessage.classList.add("is-visible");
        window.clearTimeout(showStatus.timer);
        showStatus.timer = window.setTimeout(() => {
            statusMessage.classList.remove("is-visible");
        }, 2600);
    }

    function setText(selector, value) {
        const element = document.querySelector(selector);
        if (element) element.textContent = value;
    }

    function setTexts(selector, values) {
        document.querySelectorAll(selector).forEach((element, index) => {
            if (values[index] !== undefined) element.textContent = values[index];
        });
    }

    function applyLanguage(language) {
        const t = translations[language];
        currentLanguage = language;
        document.documentElement.lang = language;
        document.title = t.documentTitle;
        localStorage.setItem("invertu-language", language);

        setTexts(".main-nav a", t.nav);
        setTexts(".footer-nav a", [t.nav[0], t.nav[1], t.nav[2], t.nav[3], t.nav[5], t.support, t.terms, t.privacy]);
        setText(".header-ctas .btn-ghost", t.login);
        setText(".header-ctas .btn-primary", t.signup);
        setText(".badge:not(.badge--gold)", t.badge);
        const heroTitle = document.querySelector(".hero h1");
        if (heroTitle) heroTitle.innerHTML = `${t.heroTitle} <span class="accent">${t.heroAccent}</span>`;
        setText(".hero .lead", t.heroDescription);
        setText(".hero-actions .btn-primary", t.signup);
        setText(".hero-actions .btn-outline", t.explore);
        setTexts(".checklist li", t.checklist);
        setText(".benefits h2", t.benefitsTitle);
        setText(".benefits .section-lead", t.benefitsLead);
        document.querySelectorAll(".benefit-card").forEach((card, index) => {
            card.querySelector("h3").textContent = t.benefits[index][0];
            card.querySelector("p").textContent = t.benefits[index][1];
        });
        setTexts(".stat small", t.stats);
        setText(".benefits .center .btn", t.organize);
        setText(".badge--gold", t.assistantBadge);
        setText(".assistant h2", t.assistantTitle);
        setText(".assistant-copy > p", t.assistantDescription);
        setTexts(".prompt", t.prompts);
        document.querySelectorAll(".prompt span").forEach((span) => span.textContent = "›");
        setText(".assistant-copy > .btn", t.assistantButton);
        setText(".testimonials h2", t.testimonialsTitle);
        setText(".testimonials .section-lead", t.testimonialsLead);
        setTexts(".testimonial-user span", t.testimonialsRoles);
        setTexts(".testimonial-card p", t.testimonials.map((text) => `"${text}"`));
        setText(".pricing h2", t.plansTitle);
        setText(".pricing .section-lead", t.plansLead);
        const priceCards = document.querySelectorAll(".price-card");
        if (priceCards.length === 2) {
            setText(".price-card:first-child h3", t.freePlan);
            setText(".price-card-featured h3", t.premiumPlan);
            setTexts(".price span", [t.perMonth, t.perMonth]);
            setText(".recommended", t.recommended);
            setTexts(".price-card:first-child li", t.freeFeatures);
            setTexts(".price-card-featured li", t.premiumFeatures);
            setText(".price-card:first-child .btn", t.signup);
            setText(".price-card-featured .btn", t.premiumPlan);
        }
        setText(".trust h2", t.trustTitle);
        document.querySelectorAll(".trust-card").forEach((card, index) => {
            card.querySelector("h3").textContent = t.trust[index][0];
            card.querySelector("p").textContent = t.trust[index][1];
        });
        setText(".faq > h3", t.faqTitle);
        setTexts("#faq-list summary", t.faqQuestions);
        setTexts("#faq-list details p", t.faqAnswers);
        setText(".support-link", t.support);
        setText(".final-cta h2", t.finalTitle);
        setTexts(".cta-actions .btn", [t.signup, t.login]);
        setText(".footer-bottom small", t.footerCopy);
        setText(".language-label", t.language);
        setText(".language-option-es", t.languageEs);
        setText(".language-option-en", t.languageEn);
        setText("#support-modal h2", t.modalTitle);
        setText("#support-form label:nth-of-type(1)", t.modalName);
        setText("#support-form label:nth-of-type(2)", t.modalEmail);
        setText("#support-form label:nth-of-type(3)", t.modalMessage);
        setText("#support-form button[type='submit']", t.modalSend);
        setText("#support-close", t.modalClose);
        supportStatus.textContent = t.modalNotice;
        languageSelect.value = language;
        assistantResponse.hidden = true;
    }

    document.querySelectorAll(".prompt").forEach((button, index) => {
        button.addEventListener("click", () => {
            assistantResponseText.textContent = translations[currentLanguage].assistantResponses[index];
            assistantResponse.hidden = false;
        });
    });

    document.querySelectorAll(".header-ctas .btn, .hero-actions .btn-primary, .benefits .center .btn, .assistant-copy > .btn, .price-card .btn, .cta-actions .btn").forEach((button) => {
        button.addEventListener("click", (event) => {
            if (button.closest(".hero-actions")?.querySelector("a") === button) return;
            event.preventDefault();
            showStatus(translations[currentLanguage].available);
        });
    });

    document.querySelectorAll(".main-nav a, .footer-nav a").forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");
            if (!targetId || !targetId.startsWith("#")) return;
            const target = document.querySelector(targetId);
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            mainNavLinks.forEach((link) => {
                link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}` || (entry.target.id === "hero" && link.getAttribute("href") === "#inicio"));
            });
        });
    }, { rootMargin: "-40% 0px -50% 0px" });

    sections.forEach((section) => observer.observe(section));

    document.querySelector(".support-link")?.addEventListener("click", (event) => {
        event.preventDefault();
        supportModal.classList.add("is-open");
        supportModal.setAttribute("aria-hidden", "false");
        supportModal.querySelector("input")?.focus();
    });

    function closeSupport() {
        supportModal.classList.remove("is-open");
        supportModal.setAttribute("aria-hidden", "true");
        supportForm.reset();
        supportStatus.classList.remove("is-visible");
    }

    supportClose.addEventListener("click", closeSupport);
    supportModal.addEventListener("click", (event) => {
        if (event.target === supportModal) closeSupport();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && supportModal.classList.contains("is-open")) closeSupport();
    });

    supportForm.addEventListener("submit", (event) => {
        event.preventDefault();
        supportStatus.textContent = translations[currentLanguage].modalNotice;
        supportStatus.classList.add("is-visible");
    });

    languageSelect.addEventListener("change", () => {
        applyLanguage(languageSelect.value);
    });

    applyLanguage(currentLanguage);

    const menuToggle = document.getElementById("menu-toggle");
    const mainNav = document.querySelector(".main-nav");
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", () => {
            const isOpen = mainNav.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
        });

        mainNav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                mainNav.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Abrir menú");
            });
        });
    }
});
