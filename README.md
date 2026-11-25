# Coding Playground

My personal collection of courses, exercises and small projects in software development
and artificial intelligence. The repository records both completed exercises and ongoing
experiments; each project documents its own scope and setup.

For core concepts, I prioritize writing code by hand to build understanding. Later
reviews improve organization, documentation and maintainability without hiding the
learning process.

## Start here

| Project | What to explore | Current scope |
| --- | --- | --- |
| [LangChain and LangGraph course](artificial-intelligence/langchain-langgraph-python/README.md) | LCEL, RAG, graph workflows, persistence and semantic memory | 25 exercises, five Streamlit apps and offline behavior/UI tests |
| [Personal portfolio](react/portfolio/README.md) | React, TypeScript, bilingual content and reusable components | Portfolio with English/Spanish CV downloads |
| [Óscar predice](artificial-intelligence/machine-learning/oscar-predice/README.md) | Data collection, model assumptions and evaluation | F1 experiments and an initial polling-error exercise |
| [C# from zero to hero](C%23/from_zero_to_hero/README.md) | Fundamentals, collections, OOP and concurrency | Interactive console menu with 22 entries |
| [Kotlin task manager](playground/kotlin-to-do-app/README.md) | Compose, MVVM and Firebase integration | Android learning app; requires your Firebase configuration |

## Repository map

```text
coding-playground/
├── artificial-intelligence/
│   ├── langchain-langgraph-python/       Course exercises and local applications
│   ├── inteligencia-artificial-avanzada/ Agent–environment interaction exercises
│   ├── machine-learning/
│   │   ├── oscar-predice/                F1 and polling experiments
│   │   ├── linear-regression/            Sector/lap-time regression exercise
│   │   └── expert-systems/               Fuzzy-rule inference exercise
│   └── deep-learning/                   Earlier full-stack RAG experiment
├── C#/                                  C# fundamentals and Azure AI labs
├── python/                              Small Python scripts and exercises
├── react/                               Portfolio and component exercises
└── playground/                          Experiments in other technologies
```

Browse the area indexes: [AI](artificial-intelligence/README.md), [C#](C%23/README.md),
[Python](python/README.md), [React](react/README.md) and [Playground](playground/README.md).

## Running a project

This is a collection of independent projects, not a single application. Open the
project directory and follow its README; there is no repository-wide install,
development server or test command.

For example, from `artificial-intelligence/langchain-langgraph-python`:

```powershell
uv sync --frozen --extra apps --extra dev
uv run python -m pytest -q
```

Those tests use simulated models and embeddings. Live chat, embeddings, Azure and
Firebase examples require separate credentials and service configuration.

## Project status and checks

- The LangChain/LangGraph course has its own [CI workflow](.github/workflows/langchain-langgraph-python.yml) for lint, formatting and tests.
- JavaScript projects expose their checks through their own `package.json` scripts.
- The F1 dataset project currently implements collection; model training and inference remain future work.
- The Alice RAG chatbot is an earlier experiment with legacy LangChain imports, documented separately from the reviewed course.
- The school assistant and Ligia wiki are no longer part of this checkout.

Environment files, virtual environments, caches and local course archives are excluded
from publication. Credentials belong in your local environment; generated data and
project-specific requirements are described in each project.
