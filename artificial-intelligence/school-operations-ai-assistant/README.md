# School Operations AI Assistant

Interview-preparation proof of concept for a secure AI assistant for school
staff. It combines FastAPI, PostgreSQL, Keycloak/OIDC, an OpenAI model, an MCP
server, a small local RAG corpus, and offline tests/evaluation scenarios.

> This is a local learning POC with fictional data. It is not a production
> student-data system. Never commit `.env` or use real student data in the demo.

## Architecture

```text
Browser / API client
  -> FastAPI (OIDC validation, input limits, request ID, rate limit)
  -> OpenAI Responses API (gpt-4o-mini, tool allowlist, bounded tool loop)
  -> MCP client with the user's access token
  -> MCP server
      -> PostgreSQL (student lookup scoped to the signed-in tutor)
      -> local Markdown corpus (bounded lexical retrieval for RAG)
```

The model proposes a tool call. The backend checks the allowlist and validates
its arguments; the MCP server revalidates the user's token and enforces tutor
authorization for student data. Retrieved document text is treated as untrusted
content. It cannot grant permissions or issue instructions to the application.

## Prerequisites

- Python 3.12
- `uv`
- Docker Desktop with Docker Compose
- An OpenAI API key for live assistant requests

Copy `.env.example` to `.env`, then fill local database/Keycloak passwords and
your OpenAI key. Keep the configured model as `gpt-4o-mini` (or set
`OPENAI_MODEL` to another model available to your API project). The example
uses fictitious local credentials; replace them for your own environment.

## Start local services (PowerShell)

```powershell
uv sync
docker compose up -d db keycloak
docker compose ps
uv run --env-file .env alembic upgrade head
docker compose exec db sh -c 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -f /seed/001_demo_student.sql'
```

Create or update the restricted application role once in PostgreSQL. This is a
local interactive example; enter the same password as `APP_DB_PASSWORD` when
`\password` prompts. Do not put the password into a committed SQL file.

```powershell
docker compose exec db sh -c 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"'
```

In the `psql` prompt:

```sql
CREATE ROLE school_app LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE;
\password school_app
GRANT CONNECT ON DATABASE school_operations_db TO school_app;
GRANT USAGE ON SCHEMA public TO school_app;
GRANT SELECT ON TABLE public.students, public.classes, public.teachers TO school_app;
GRANT USAGE ON TYPE public.academic_status TO school_app;
```

If the role already exists, skip `CREATE ROLE` and run the grants. Exit with
`\q`. The example assumes `POSTGRES_DB=school_operations_db`.

Start the MCP server in one terminal:

```powershell
uv run --env-file .env python -m school_assistant.mcp_server
```

Start the API in another terminal:

```powershell
uv run --env-file .env fastapi dev src/school_assistant/main.py --host 127.0.0.1 --port 8000
```

Open `http://localhost:8000/docs`, authorize using the local Keycloak realm, and
try `GET /health`, `GET /ready`, `GET /students/{student_id}`, and
`POST /assistant/chat`. The fictional seeded student UUID is
`550e8400-e29b-41d4-a716-446655440003`. A teacher token must contain the matching
`teacher_id` claim to view the sample record.

The demo realm creates the `teacher-demo` account without a password. For a
local login, open `http://localhost:8080/admin/`, sign in with the Keycloak
bootstrap admin values from `.env`, select the `school-demo` realm, then set a
password for `teacher-demo` under **Users → Credentials**. Keep that password
local; this realm and its users are only for the development demo.

For `/assistant/chat`, submit for example:

```json
{"question":"Resume al alumno 550e8400-e29b-41d4-a716-446655440003"}
```

Document questions can ask about convivencia, urgent incidents, attendance, or
support. The RAG implementation uses local paragraph chunks and lexical term
overlap. It deliberately does not call an embedding API or use a vector DB.

## Checks

```powershell
uv run --with ruff ruff check .
uv run --with pytest pytest -q
```

CI runs the same lint and offline test/evaluation checks on Python 3.12. The
golden set contains 20 scenarios. Its RAG cases and data shape are checked
offline; the complete LLM tool-selection and answer-quality suite is a manual
or separately budgeted evaluation because it makes external API calls.

## Endpoints and tools

- `GET /health`: process liveness.
- `GET /ready`: database readiness (`SELECT 1`).
- `GET /students/{student_id}`: authenticated, tutor-scoped lookup.
- `POST /assistant/chat`: bounded assistant request with a per-teacher in-process
  rate limit.
- MCP `get_student_summary`: read-only query scoped by the verified teacher ID.
- MCP `search_school_documents`: read-only local policy search.

Application logs are JSON and include a server-generated `request_id`, route,
status, latency, model, prompt version, per-call token counts when returned by
the provider, and tool name/duration. They intentionally exclude prompts, tool arguments,
tokens, and student records. Request limits and rate limits are process-local,
so production deployment would need shared infrastructure and stronger controls.

## Scope and limitations

This POC does not implement schedule, incident, or ticketing integrations,
semantic/vector search, distributed tracing, distributed rate limiting, or
production Keycloak configuration. The API/MCP processes are run locally rather
than included in Compose. Before any real deployment, review data residency and
retention, provider terms, privacy/legal requirements, network boundaries,
secret management, monitoring, load limits, and end-to-end security tests.
