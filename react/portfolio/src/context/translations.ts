export const en = {
    header: {
        downloadCV: "Download CV",
        cvFile: "/cv-oscar-fraile.pdf"
    },
    hero: {
        greeting: "Hi, I'm",
        bio: "Full Stack Engineer, backend-focused. I build distributed systems, scalable APIs, and containerized infrastructure — things meant to last in production. With an eye for clean, minimalist design and a soft spot for well-crafted frontend microsites. Genuinely curious, always learning. AI-powered across all my workflows: agentic pipelines, MCP integrations, and LLM tooling woven into how I build.",
        location: "Madrid, Spain",
        projectsBtn: "View Projects"
    },
    experience: {
        title: "Professional Experience",
        educaria: {
            title: "Full Stack Engineer",
            company: "Educaria",
            period: "2019 – Present",
            description: "Full Stack Engineer at Educaria, contributing to the development of Alexia — the leading educational platform for schools and universities in Spain and Latin America, with 2M+ active users across web, Android, and iOS. Led the evolution from a monolithic architecture to a microservices-based system using .NET Core, Clean Architecture, SOLID, DDD, and CQRS. Containerize services with Docker and manage the DevOps lifecycle via Azure DevOps and Kubernetes. In the past year, focused on AI-assisted development, integrating Claude Code agents and MCP workflows to streamline engineering processes. Mentors junior developers and collaborates with cross-functional teams."
        },
        nttData: {
            title: "Solutions Assistant",
            company: "NTT Data",
            period: "2017 – 2019",
            description: "Software Developer at NTT Data, working on a large-scale project for Repsol, developing mission-critical point-of-sale, handheld, and back-office systems deployed across gas stations in Spain and Peru. Contributed to development, unit testing, and documentation within agile teams, helping maintain reliable transaction processing systems for a large-scale retail infrastructure."
        }
    },
    techStack: {
        title: "Tech Stack",
        frontend: "Frontend",
        backend: "Backend",
        architecture: "Architecture & DevOps",
        databases: "Databases",
        ai: "AI & Automation"
    },
    projects: {
        title: "Personal Projects",
        seeMore: "See more →",
        modalAbout: "About",
        modalRole: "What I built",
        modalStack: "Stack",
        modalDemo: "View demo",
        gredio: {
            title: "Gredio",
            tagline: "Speaker diarization platform — from the model to the API",
            about: "A friend and I built a custom EEND neural network from scratch: Whisper's audio encoder (multi-head attention transformer) paired with an LSTM-based decoder that classifies active speakers frame by frame across long-form audio. The model runs on ephemeral NVIDIA GPU VMs, spun up on demand and self-destructing when done.",
            myRole: "I designed and built everything around it — a production FastAPI REST API on Cloud Run, a prepaid credit system backed by atomic Firestore transactions (reserve → charge → release, making double-spend structurally impossible), four authentication layers (SHA-256-hashed API keys, HS256 JWTs, short-lived admin session tokens, single-use internal VM tokens), and a React admin dashboard.",
            highlights: "Async-first design · Cloud Scheduler watchdog auto-recovers stuck jobs and refunds credits · Sliding-window rate limiter · Multi-tenant with full GDPR delete"
        },
        portfolio: {
            title: "This Portfolio",
            tagline: "The site you're on right now",
            about: "Built with React 19, TypeScript, Vite, and Tailwind CSS v4.",
            myRole: "Bilingual interface (EN/ES), Apple-inspired design system, and sections for experience, tech stack, and projects.",
            highlights: ""
        }
    },
    footer: {
        copyright: `© ${new Date().getFullYear()} Óscar Fraile. Madrid, Spain.`
    }
};

export const es = {
    header: {
        downloadCV: "Descargar CV",
        cvFile: "/cv-oscar-fraile.pdf"
    },
    hero: {
        greeting: "Hola, soy",
        bio: "Full Stack Engineer, con foco en backend. Construyo sistemas distribuidos, APIs escalables e infraestructura contenerizada — cosas pensadas para aguantar en producción. Con ojo para el diseño limpio y minimalista, y debilidad por los frontend microsites bien construidos. Genuinamente curioso, siempre aprendiendo. Con IA en todos mis flujos: pipelines agénticos, integraciones MCP y tooling con LLMs integrado en cómo construyo.",
        location: "Madrid, España",
        projectsBtn: "Ver Proyectos"
    },
    experience: {
        title: "Experiencia Profesional",
        educaria: {
            title: "Full Stack Engineer",
            company: "Educaria",
            period: "2019 – Actualidad",
            description: "Full Stack Engineer en Educaria, contribuyendo al desarrollo de Alexia, la plataforma educativa líder para colegios y universidades en España y Latinoamérica, con más de 2M de usuarios activos en web, Android e iOS. Lideré la evolución de una arquitectura monolítica a un sistema basado en microservicios con .NET Core, siguiendo Clean Architecture, SOLID, DDD y CQRS. Contenerizo servicios con Docker y gestiono el ciclo DevOps con Azure DevOps y Kubernetes. En el último año, enfocado en el desarrollo asistido por IA, integrando agentes de Claude Code y flujos MCP para optimizar los procesos de ingeniería. Mentorizo desarrolladores junior y colaboro con equipos multifuncionales."
        },
        nttData: {
            title: "Solutions Assistant",
            company: "NTT Data",
            period: "2017 – 2019",
            description: "Desarrollador de software en NTT Data, trabajando en un proyecto a gran escala para Repsol, desarrollando sistemas críticos de punto de venta, dispositivos portátiles y aplicaciones de back-office para estaciones de servicio en España y Perú. Contribuí al desarrollo, pruebas unitarias y documentación en equipos ágiles, ayudando a mantener sistemas de procesamiento de transacciones fiables para una gran infraestructura retail."
        }
    },
    techStack: {
        title: "Tech Stack",
        frontend: "Frontend",
        backend: "Backend",
        architecture: "Arquitectura y DevOps",
        databases: "Bases de Datos",
        ai: "IA y Automatización"
    },
    projects: {
        title: "Proyectos Personales",
        seeMore: "Ver más →",
        modalAbout: "Sobre el proyecto",
        modalRole: "Lo que construí yo",
        modalStack: "Stack",
        modalDemo: "Ver demo",
        gredio: {
            title: "Gredio",
            tagline: "Plataforma de diarización de hablantes — del modelo a la API",
            about: "Un amigo y yo construimos una red neuronal EEND personalizada desde cero: el encoder de audio de Whisper (transformer con multi-head attention) combinado con un decoder basado en LSTM que clasifica hablantes activos frame a frame en audio de larga duración. El modelo corre en VMs GPU NVIDIA efímeras que se arrancan bajo demanda y se auto-destruyen al terminar.",
            myRole: "Yo diseñé y construí todo lo que lo rodea — una API REST de producción con FastAPI en Cloud Run, un sistema de créditos prepago con transacciones atómicas de Firestore (reserva → cargo → liberación, haciendo el doble gasto estructuralmente imposible), cuatro capas de autenticación (API keys con hash SHA-256, JWTs HS256, tokens de sesión admin de corta duración, tokens internos de un solo uso por VM) y un panel de administración en React.",
            highlights: "Diseño async-first · Watchdog en Cloud Scheduler recupera jobs atascados y reembolsa créditos · Rate limiter de ventana deslizante · Multi-tenant con borrado GDPR completo"
        },
        portfolio: {
            title: "Este Portfolio",
            tagline: "La web en la que estás ahora mismo",
            about: "Construido con React 19, TypeScript, Vite y Tailwind CSS v4.",
            myRole: "Interfaz bilingüe (ES/EN), sistema de diseño inspirado en Apple y secciones de experiencia, tech stack y proyectos.",
            highlights: ""
        }
    },
    footer: {
        copyright: `© ${new Date().getFullYear()} Óscar Fraile. Madrid, España.`
    }
};

export type Translations = typeof en;
