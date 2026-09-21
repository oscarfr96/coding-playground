export const en = {
    header: {
        downloadCV: "Download CV",
        cvFile: "/cv-oscar-fraile.pdf"
    },
    hero: {
        greeting: "Hi, I'm",
        name: "Óscar Fraile",
        role: "Software Engineer",
        tagline: "I build software,",
        taglineAccent: "from idea to production.",
        bio: "I'm a software engineer who enjoys working on the backend, figuring out how the pieces fit together, and turning ideas into working products. I also care about thoughtful design and making those products intuitive to use. Lately, I've been building tools with AI.",
        location: "Madrid, Spain",
        projectsBtn: "Explore my projects"
    },
    experience: {
        title: "Professional Experience",
        educaria: {
            title: "Full Stack Engineer",
            company: "Educaria",
            period: "2019 – Present",
            summary: "Building Alexia — the leading EdTech platform for schools and universities in Spain and Latin America, with 2M+ active users across web, Android, and iOS.",
            points: [
                "Led the evolution from a monolith to a microservices-based system with .NET Core (Hexagonal Architecture, Clean Architecture, SOLID, DDD, CQRS).",
                "Secured the platform with Identity Server and scaled performance with Redis caching.",
                "Own the DevOps lifecycle: Docker containers, CI/CD pipelines on Azure DevOps, and Kubernetes orchestration managed with Rancher.",
                "Built test coverage with xUnit and BDD scenarios in Gherkin.",
                "Driving AI-assisted development — Claude Code agents, MCP workflows, and a shared vault of skills, roles, and Spec-Driven Development.",
                "Built a RAG-powered chatbot to assist teachers and students."
            ]
        },
        nttData: {
            title: "Solutions Assistant",
            company: "NTT Data",
            period: "2017 – 2019",
            summary: "Software developer on a large-scale project for Repsol, powering point-of-sale across gas stations in Spain and Peru.",
            points: [
                "Built mission-critical point-of-sale, handheld, and back-office systems.",
                "Joined the early phase of the new back-office front-end, built with Angular.",
                "Handled development, unit testing, and documentation within agile teams.",
                "Helped keep transaction processing reliable across a large retail infrastructure."
            ]
        }
    },
    techStack: {
        title: "Tech Stack",
        frontend: "Frontend",
        backend: "Backend",
        architecture: "Architecture & DevOps",
        databases: "Databases",
        ai: "AI & Automation",
        testing: "Testing & Quality"
    },
    education: {
        title: "Education",
        degrees: [
            {
                period: "2026",
                degree: "Bachelor's Degree in Computer Engineering",
                institution: "UDIMA — Universidad a Distancia de Madrid",
                note: "Earned while working full-time as a software engineer."
            },
            {
                period: "2017",
                degree: "Higher Diploma in Multiplatform Application Development",
                institution: "Centro Europeo de Estudios Profesionales",
                note: "Spanish higher vocational degree (Grado Superior, DAM)."
            }
        ],
        certificationsTitle: "Certifications",
        certifications: [
            { year: "2026", title: "Microsoft Certified: Azure Developer Associate", issuer: "Microsoft", link: "https://learn.microsoft.com/es-es/users/oscarfraile-4162/credentials/71071e593e7051f5?ref=https%3A%2F%2Fwww.linkedin.com%2F" },
            { year: "2026", title: "Claude Code in Action", issuer: "Anthropic", link: "https://verify.skilljar.com/c/yp5g3ps52vuy" },
            { year: "2026", title: "Machine Learning with Python", issuer: "IBM", link: "https://coursera.org/share/6bfc550c07dc8e0f41ddacc9ffc5d469" },
            { year: "2024", title: "What The Hack: Azure OpenAI Fundamentals", issuer: "Código Facilito", link: "https://codigofacilito.com/certificates/facb5574-782f-4688-8eab-ea874ec2d28d" },
            { year: "2024", title: "Developing Back-End Apps with Node.js and Express", issuer: "IBM", link: "https://www.coursera.org/account/accomplishments/verify/GZUFR8WVTSAM" },
            { year: "2018", title: "Cambridge English: Advanced (CAE) — CEFR C1", issuer: "University of Cambridge", link: "" }
        ]
    },
    projects: {
        title: "Personal Projects",
        seeMore: "See more →",
        modalStack: "Stack",
        modalDemo: "View demo",
        gredio: {
            title: "GoIA",
            tagline: "Speaker diarization platform — from the model to the API",
            stats: [
                { figure: "EEND", label: "custom model" },
                { figure: "Batch API", label: "async · job-based" },
                { figure: "FastAPI", label: "REST backend" },
                { figure: "Google Cloud", label: "Run · GPU VMs · Firestore" }
            ],
            about: "GoIA is a speaker diarization service: it works out who speaks and when in an audio file, returning timestamps and speaker labels — no transcription. At its core is an EEND model — a Whisper-style audio encoder feeding a bidirectional GRU that flags active speakers frame by frame — which a friend and I built together; I designed and built the whole platform around it.",
            built: [
                "Async, job-based Batch API in FastAPI on Cloud Run: create job → upload audio → run → poll/webhook → results.",
                "On-demand GPU orchestration: spins up ephemeral Compute Engine VMs (T4→L4 zone cascade) that run the model in Docker and self-delete when done.",
                "Prepaid credit system with atomic Firestore transactions and per-key minute quotas.",
                "Layered auth (API keys, JWT, admin and single-use VM tokens), webhooks with retry/backoff, and a Cloud Scheduler watchdog that fails stuck jobs and refunds credits.",
                "Designed and built the marketing landing page and the React admin/client dashboard (TanStack Query, Zustand, i18n), shaping both the visual design and the user experience — both deployed on Vercel."
            ]
        },
        worldCup: {
            title: "2026 World Cup Predictor",
            tagline: "Match predictions for the 2026 World Cup, with an honest track record",
            stats: [
                { figure: "Poisson GLM", label: "two-phase model" },
                { figure: "Dixon-Coles", label: "scoreline correction" },
                { figure: "FastAPI", label: "REST backend" },
                { figure: "Daily cron", label: "GitHub Actions" }
            ],
            about: "An open predictor for every 2026 World Cup match: favorite, expected goals, 1X2 probabilities, and the most likely scorelines — plus an honest track record that freezes each prediction before kickoff and compares it to the real result. The model runs in two phases: a Poisson GLM is pre-trained on recent international matches so it starts the tournament without a cold start, then a second Poisson GLM learns from the World Cup's own goals and blends with the prior via shrinkage as more matches are played.",
            built: [
                "Two-phase Poisson GLM: a pre-trained prior from international matches, blended with in-tournament learning via shrinkage as more games are played.",
                "Dixon-Coles correction for low-scoring matches and a full scoreline matrix to derive 1X2 probabilities and favorites.",
                "FastAPI backend on Render with a JSON cache, recomputed once a day via a GitHub Actions cron, plus per-IP rate limiting with slowapi.",
                "React + Vite + Tailwind frontend on Vercel, with a track record persisted in Vercel Blob comparing frozen predictions to real results."
            ]
        },
        portfolio: {
            title: "This Portfolio",
            tagline: "The site you're on right now",
            stats: [
                { figure: "EN / ES", label: "bilingual UI" },
                { figure: "React 19", label: "+ Tailwind v4" }
            ],
            about: "Built with React 19, TypeScript, Vite, and Tailwind CSS v4.",
            built: [
                "Bilingual interface (EN/ES) with a custom \"Flower Boy\" design system.",
                "Sticker-card visual language, fully responsive.",
                "Sections for experience, tech stack, and projects."
            ]
        }
    },
    footer: {
        copyright: `© ${new Date().getFullYear()} Óscar Fraile. Madrid, Spain.`
    }
};

export const es = {
    header: {
        downloadCV: "Descargar CV",
        cvFile: "/cv-oscar-fraile-es.pdf"
    },
    hero: {
        greeting: "Hola, soy",
        name: "Óscar Fraile",
        role: "Software Engineer",
        tagline: "Construyo software,",
        taglineAccent: "desde la idea hasta producción.",
        bio: "Soy ingeniero de software. Me gusta trabajar en el backend, pensar cómo encajan las piezas y convertir ideas en productos que funcionan. También cuido el diseño y la experiencia de usuario para que esos productos resulten intuitivos. Últimamente, construyo herramientas con IA.",
        location: "Madrid, España",
        projectsBtn: "Explora mis proyectos"
    },
    experience: {
        title: "Experiencia Profesional",
        educaria: {
            title: "Full Stack Engineer",
            company: "Educaria",
            period: "2019 – Actualidad",
            summary: "Construyendo Alexia — la plataforma EdTech líder para colegios y universidades en España y Latinoamérica, con 2M+ de usuarios activos en web, Android e iOS.",
            points: [
                "Lideré la evolución de un monolito a un sistema basado en microservicios con .NET Core (Hexagonal Architecture, Clean Architecture, SOLID, DDD, CQRS).",
                "Aseguré la plataforma con Identity Server y escalé el rendimiento con caching en Redis.",
                "Gestiono el ciclo DevOps: contenedores Docker, pipelines CI/CD en Azure DevOps y orquestación en Kubernetes gestionada con Rancher.",
                "Construí cobertura de tests con xUnit y escenarios BDD en Gherkin.",
                "Impulsando el desarrollo asistido por IA — agentes de Claude Code, flujos MCP y un vault compartido de skills, roles y Spec-Driven Development.",
                "Desarrollé un chatbot con RAG para asistencia a profesores y alumnos."
            ]
        },
        nttData: {
            title: "Solutions Assistant",
            company: "NTT Data",
            period: "2017 – 2019",
            summary: "Desarrollador de software en un proyecto a gran escala para Repsol, dando soporte al punto de venta en estaciones de servicio de España y Perú.",
            points: [
                "Desarrollé sistemas críticos de punto de venta, dispositivos portátiles y back-office.",
                "Participé en la fase temprana del nuevo front-end de back-office, construido con Angular.",
                "Encargado del desarrollo, pruebas unitarias y documentación en equipos ágiles.",
                "Ayudé a mantener fiable el procesamiento de transacciones en una gran infraestructura retail."
            ]
        }
    },
    techStack: {
        title: "Tech Stack",
        frontend: "Frontend",
        backend: "Backend",
        architecture: "Arquitectura y DevOps",
        databases: "Bases de Datos",
        ai: "IA y Automatización",
        testing: "Testing y Calidad"
    },
    education: {
        title: "Educación",
        degrees: [
            {
                period: "2026",
                degree: "Grado en Ingeniería Informática",
                institution: "UDIMA — Universidad a Distancia de Madrid",
                note: "Cursado mientras trabajaba a tiempo completo como ingeniero de software."
            },
            {
                period: "2017",
                degree: "Grado Superior en Desarrollo de Aplicaciones Multiplataforma (DAM)",
                institution: "Centro Europeo de Estudios Profesionales",
                note: "Formación profesional de grado superior en desarrollo de software."
            }
        ],
        certificationsTitle: "Certificaciones",
        certifications: [
            { year: "2026", title: "Microsoft Certified: Azure Developer Associate", issuer: "Microsoft", link: "https://learn.microsoft.com/es-es/users/oscarfraile-4162/credentials/71071e593e7051f5?ref=https%3A%2F%2Fwww.linkedin.com%2F" },
            { year: "2026", title: "Claude Code in Action", issuer: "Anthropic", link: "https://verify.skilljar.com/c/yp5g3ps52vuy" },
            { year: "2026", title: "Machine Learning with Python", issuer: "IBM", link: "https://coursera.org/share/6bfc550c07dc8e0f41ddacc9ffc5d469" },
            { year: "2024", title: "What The Hack: Azure OpenAI Fundamentals", issuer: "Código Facilito", link: "https://codigofacilito.com/certificates/facb5574-782f-4688-8eab-ea874ec2d28d" },
            { year: "2024", title: "Developing Back-End Apps with Node.js and Express", issuer: "IBM", link: "https://www.coursera.org/account/accomplishments/verify/GZUFR8WVTSAM" },
            { year: "2018", title: "Cambridge English: Advanced (CAE) — CEFR C1", issuer: "University of Cambridge", link: "" }
        ]
    },
    projects: {
        title: "Proyectos Personales",
        seeMore: "Ver más →",
        modalStack: "Stack",
        modalDemo: "Ver demo",
        gredio: {
            title: "GoIA",
            tagline: "Plataforma de diarización de hablantes — del modelo a la API",
            stats: [
                { figure: "EEND", label: "modelo a medida" },
                { figure: "Batch API", label: "asíncrona · por jobs" },
                { figure: "FastAPI", label: "backend REST" },
                { figure: "Google Cloud", label: "Run · VMs GPU · Firestore" }
            ],
            about: "GoIA es un servicio de diarización de hablantes: detecta quién habla y cuándo en un audio y devuelve timestamps y etiquetas de hablante — sin transcripción. En su núcleo hay un modelo EEND — un encoder de audio estilo Whisper que alimenta un GRU bidireccional para marcar los hablantes activos frame a frame — que desarrollé junto a un amigo; yo diseñé y construí toda la plataforma a su alrededor.",
            built: [
                "Batch API asíncrona y por jobs en FastAPI sobre Cloud Run: crear job → subir audio → ejecutar → polling/webhook → resultados.",
                "Orquestación GPU bajo demanda: levanta VMs efímeras de Compute Engine (cascada de zonas T4→L4) que ejecutan el modelo en Docker y se auto-eliminan al terminar.",
                "Sistema de crédito prepago con transacciones atómicas de Firestore y cuotas de minutos por API key.",
                "Auth por capas (API keys, JWT, tokens de admin y de VM de un solo uso), webhooks con reintentos/backoff y un watchdog en Cloud Scheduler que marca jobs atascados y reembolsa créditos.",
                "Diseñé y desarrollé la landing de marketing y el dashboard de admin/cliente en React (TanStack Query, Zustand, i18n), cuidando tanto el diseño visual como la experiencia de usuario — ambos desplegados en Vercel."
            ]
        },
        worldCup: {
            title: "Predictor Mundial 2026",
            tagline: "Predicciones de los partidos del Mundial 2026, con registro honesto de aciertos",
            stats: [
                { figure: "GLM de Poisson", label: "modelo en dos fases" },
                { figure: "Dixon-Coles", label: "corrección de marcadores" },
                { figure: "FastAPI", label: "backend REST" },
                { figure: "Cron diario", label: "GitHub Actions" }
            ],
            about: "Predictor abierto de los partidos del Mundial 2026: favorito, goles esperados, probabilidades 1X2 y los marcadores más probables — además de un registro honesto de aciertos que congela cada predicción antes del partido y la compara con el resultado real. El modelo funciona en dos fases: un GLM de Poisson se pre-entrena con partidos internacionales recientes para llegar al torneo sin cold start, y un segundo GLM de Poisson aprende de los goles del propio Mundial, mezclándose con el prior mediante shrinkage a medida que se juegan más partidos.",
            built: [
                "GLM de Poisson en dos fases: un prior pre-entrenado con partidos internacionales, mezclado con el aprendizaje del propio torneo mediante shrinkage a medida que se juegan partidos.",
                "Corrección de Dixon-Coles para marcadores bajos y una matriz completa de marcadores para derivar probabilidades 1X2 y favoritos.",
                "Backend FastAPI en Render con caché JSON, recalculado una vez al día mediante un cron de GitHub Actions, y rate limiting por IP con slowapi.",
                "Frontend React + Vite + Tailwind en Vercel, con un registro de aciertos persistido en Vercel Blob que compara predicciones congeladas con resultados reales."
            ]
        },
        portfolio: {
            title: "Este Portfolio",
            tagline: "La web en la que estás ahora mismo",
            stats: [
                { figure: "EN / ES", label: "UI bilingüe" },
                { figure: "React 19", label: "+ Tailwind v4" }
            ],
            about: "Construido con React 19, TypeScript, Vite y Tailwind CSS v4.",
            built: [
                "Interfaz bilingüe (EN/ES) con un sistema de diseño propio \"Flower Boy\".",
                "Lenguaje visual de tarjetas-pegatina, totalmente responsive.",
                "Secciones de experiencia, tech stack y proyectos."
            ]
        }
    },
    footer: {
        copyright: `© ${new Date().getFullYear()} Óscar Fraile. Madrid, España.`
    }
};

export type Translations = typeof en;
