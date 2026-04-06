export const en = {
    header: {
        downloadCV: "Download CV",
        cvFile: "/cv-oscar-fraile.pdf"
    },
    hero: {
        greeting: "Hi, I'm",
        bio: "Backend-focused Full Stack Engineer with 9+ years of experience building distributed systems and scalable APIs. Specialized in .NET Core, microservices architecture, and containerized deployments — with a strong focus on AI-assisted development using Claude Code agents and MCP workflows.",
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
        textSage: {
            title: "Gredio Audio Hub",
            description: "Full-stack audio platform with transcription and speaker diarization, co-developed with a friend. The transcription engine uses an optimized Whisper model fine-tuned for Spanish, delivering high accuracy on real-world recordings. The diarization model extends the Whisper encoder with LSTM and embedding layers for multi-speaker classification, achieving performance comparable to PyAnnote — running via a serverless Firebase Cloud Functions pipeline. Built with React + Vite, .NET 8 Clean Architecture, and Firebase (Auth, Firestore, Storage). Containerized with Docker, hosted on Vercel and Azure App Service, with CI/CD fully automated via GitHub Actions."
        },
        weddingInvitation: {
            title: "Wedding Invitation",
            description: "Online wedding invitation built with React and TypeScript, fully responsive, using Firebase as the database for the guest list, with an admin panel for the couple. Hosted on Vercel."
        },
        kotlinApp: {
            title: "Kotlin To Do App",
            description: "Task management app built with Kotlin, Jetpack Compose, and Firebase. Features prioritization, time-organized views, an interactive calendar, and customizable themes. Includes a Figma-based UI mockup."
        },
        portfolio: {
            title: "This Portfolio",
            description: "Personal portfolio built with React 19, TypeScript, Vite, and Tailwind CSS v4. Features a bilingual interface (EN/ES), a clean Apple-inspired design system, and sections for experience, tech stack, and personal projects."
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
        bio: "Full Stack Engineer con enfoque en backend y más de 9 años de experiencia construyendo sistemas distribuidos y APIs escalables. Especializado en .NET Core, arquitectura de microservicios y despliegues con contenedores — con un fuerte enfoque en desarrollo asistido por IA con agentes de Claude Code y flujos MCP.",
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
        textSage: {
            title: "Gredio Audio Hub",
            description: "Co-desarrollado con un amigo: sistema de diarización de hablantes basado en el encoder de Whisper, extendido con capas LSTM y de embeddings para clasificación multi-hablante, alcanzando un rendimiento comparable a PyAnnote. Stack completo construido alrededor: frontend en React + Vite, backend en .NET 8 Clean Architecture y Firebase (Auth, Firestore, Storage). El motor de transcripción usa Whisper optimizado para español. La diarización corre en un pipeline serverless con Firebase Cloud Functions. Contenerizado con Docker, desplegado en Vercel y Azure App Service, con CI/CD automatizado mediante GitHub Actions."
        },
        weddingInvitation: {
            title: "Invitación de Boda",
            description: "Invitación de boda online construida con React y TypeScript, completamente responsive, usando Firebase como base de datos para la lista de invitados y con un panel de administración para la pareja. Alojada en Vercel."
        },
        kotlinApp: {
            title: "App de Tareas en Kotlin",
            description: "App de gestión de tareas construida con Kotlin, Jetpack Compose y Firebase. Incluye priorización, vistas organizadas por tiempo, calendario interactivo y temas personalizables. Acompañada de un mockup de UI en Figma."
        },
        portfolio: {
            title: "Este Portfolio",
            description: "Portfolio personal construido con React 19, TypeScript, Vite y Tailwind CSS v4. Interfaz bilingüe (ES/EN), sistema de diseño limpio inspirado en Apple y secciones de experiencia, tech stack y proyectos personales."
        }
    },
    footer: {
        copyright: `© ${new Date().getFullYear()} Óscar Fraile. Madrid, España.`
    }
};

export type Translations = typeof en;
