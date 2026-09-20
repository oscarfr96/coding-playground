# Chuleta del stack — Python · uv · FastAPI · Docker · PostgreSQL

Referencia práctica para el día a día, no solo para la entrevista. Se amplía al terminar cada bloque
del proyecto. Lo marcado con 💡 es lo que de verdad se usa a diario.

**Índice**

- [Python y entornos virtuales](#python-y-entornos-virtuales)
- [uv: dependencias y ejecución](#uv-dependencias-y-ejecución)
- [Ruff: lint y formato](#ruff-lint-y-formato)
- [FastAPI: routing y arranque](#fastapi-routing-y-arranque)
- [Docker: conceptos](#docker-conceptos)
- [Docker Compose: comandos](#docker-compose-comandos)
- [PostgreSQL en contenedor y psql](#postgresql-en-contenedor-y-psql)
- [Problemas típicos y su arreglo](#problemas-típicos-y-su-arreglo)

---

## Python y entornos virtuales

**El problema que resuelven**: el proyecto A necesita `fastapi 0.110` y el B `fastapi 0.118`. Si instalas
las librerías "en el Python del sistema", chocan. Un **entorno virtual** es una carpeta (`.venv/`) con su
propio Python y sus propias librerías, aislada por proyecto.

| Concepto | En una frase |
|---|---|
| `.venv/` | El entorno virtual. **Nunca** se sube a Git: se regenera con `uv sync`. |
| `pyproject.toml` | *Qué* necesita el proyecto (rangos: `fastapi>=0.115`). Sí va a Git. |
| `uv.lock` | *Exactamente* qué versiones se instalaron, incluidas las dependencias de las dependencias. Sí va a Git: es lo que hace que tu portátil, Docker y CI tengan el mismo entorno. |
| Paquete | Una carpeta con `__init__.py`. Es lo que permite `from informa.routers import health`. |
| Layout `src/` | El código en `src/informa/` en vez de en la raíz: obliga a importar el paquete *instalado*, así los tests prueban lo mismo que se despliega. |

```bash
# activar el venv a mano (con uv normalmente NO hace falta: usa `uv run`)
.venv\Scripts\activate         # Windows
source .venv/bin/activate      # Linux/macOS
deactivate
```

---

## uv: dependencias y ejecución

`uv` sustituye a `pip` + `venv` + `pip-tools`, es mucho más rápido y gestiona hasta la versión de Python.

| Comando | Para qué |
|---|---|
| 💡 `uv sync` | Crea `.venv`, instala lo del `pyproject.toml` y escribe/respeta `uv.lock`. Es el "clonar y arrancar". |
| 💡 `uv run <cmd>` | Ejecuta dentro del venv sin activarlo: `uv run pytest`, `uv run python x.py`. |
| 💡 `uv add fastapi` | Añade una dependencia de producción al `pyproject.toml` y la instala. |
| `uv add --dev pytest` | Igual, pero en el grupo `dev` (no entra en la imagen Docker). |
| `uv remove httpx` | Quitar una dependencia. |
| `uv lock --upgrade` | Recalcula el lock subiendo versiones dentro de los rangos permitidos. |
| `uv sync --frozen` | Instala **exactamente** el lock y falla si está desactualizado. **Esto es lo que se usa en CI y en Docker.** |
| `uv sync --no-dev` | Solo dependencias de producción (imagen más pequeña). |
| `uv python install 3.12` | Instala una versión de Python sin tocar el sistema. |
| `uv tool install ruff` / `uvx ruff` | Herramientas globales aisladas (como `pipx`). `uvx` = ejecutar sin instalar. |
| `uv pip list` | Ver lo instalado en el venv. |
| `uv tree` | Árbol de dependencias: quién arrastra qué. |

**Anatomía del `pyproject.toml`**

```toml
[project]
dependencies = ["fastapi>=0.115"]        # producción: va a la imagen Docker
[dependency-groups]
dev = ["pytest>=8", "ruff>=0.6"]         # solo desarrollo
[build-system]                           # permite instalar TU código como paquete
requires = ["hatchling"]
build-backend = "hatchling.build"
[tool.<herramienta>]                     # ruff, pytest, mypy... todo configurado en un solo fichero
```

---

## Ruff: lint y formato

Un único binario que sustituye a flake8 + isort + black + parte de bandit.

```bash
uv run ruff check .          # busca problemas
uv run ruff check --fix .    # arregla los que sabe arreglar (imports, líneas en blanco...)
uv run ruff format .         # formatea el código (equivalente a black)
```

Familias de reglas que activamos en `[tool.ruff.lint] select`:

| Código | Qué detecta |
|---|---|
| `E`, `F` | Errores de estilo (pycodestyle) y de lógica (pyflakes): variables sin usar, imports muertos. |
| `I` | Orden de los imports (isort): **estándar → terceros → tu código**, separados por línea en blanco. |
| `B` | *Bugbear*: trampas reales de Python, p. ej. `def f(x=[])`, mutable por defecto. |
| `UP` | Moderniza la sintaxis a la versión de Python que declaras. |
| 💡 `S` | **bandit: seguridad**. SQL concatenado, `assert` en producción, secretos a fuego, `subprocess(shell=True)`. |

---

## FastAPI: routing y arranque

```python
from fastapi import APIRouter

router = APIRouter(prefix="/health", tags=["health"])   # prefijo común + grupo en la documentación


@router.get("/live")                # -> GET /health/live
def live() -> dict[str, str]:       # el TIPO de retorno genera el esquema OpenAPI
    """Este docstring sale como descripción en Swagger."""
    return {"status": "ok"}
```

```python
def create_app() -> FastAPI:            # patrón "application factory"
    app = FastAPI(title="Informa IA", version="0.1.0")
    app.include_router(health.router)   # engancha el router a la app
    return app


app = create_app()                      # lo que busca uvicorn en "informa.main:app"
```

**Por qué una factoría y no `app = FastAPI()` suelto**: los tests llaman a `create_app()` para montar
apps limpias, con la base de datos o el LLM sustituidos por dobles.

**De dónde saca FastAPI cada parámetro**:

```python
@router.get("/reports/{report_id}")           # en la RUTA
def get_report(report_id: int,                #   -> path param, validado como int
               limit: int = 20,               #   -> query param (?limit=20), con valor por defecto
               body: MiModelo | None = None):  #  -> cuerpo JSON, validado con Pydantic
```

| Necesitas | Se escribe |
|---|---|
| Código HTTP distinto de 200 | `@router.post("/x", status_code=201)` |
| Filtrar/validar la respuesta | `response_model=MiSchema` |
| Devolver un error | `raise HTTPException(status_code=404, detail="No existe")` |
| Inyectar dependencias (BD, auth) | `def f(db: Session = Depends(get_db))` |

**Arrancar el servidor**

```bash
uv run uvicorn informa.main:app --reload                      # desarrollo: recarga al guardar
uv run uvicorn informa.main:app --host 0.0.0.0 --port 8000    # escuchando fuera (Docker)
```

| URL | Qué es |
|---|---|
| `/docs` | Swagger UI: documentación interactiva, con botón para lanzar peticiones. |
| `/redoc` | La misma documentación en formato lectura. |
| 💡 `/openapi.json` | El **contrato** de la API en OpenAPI 3.1, generado desde tus tipos. Sirve para generar clientes, tests de contrato o importarlo en Postman. |

---

## Docker: conceptos

No confundir las piezas:

| Pieza | Qué es | Ejemplo | Se borra con |
|---|---|---|---|
| **Imagen** | Plantilla de solo lectura, descargada o construida. | `postgres:17` (646 MB) | `docker rmi` |
| **Contenedor** | Un proceso en marcha a partir de una imagen. **Desechable.** | `informa-ia-db-1` | `docker compose down` |
| **Volumen** | Datos persistentes; viven fuera del contenedor. | `informa-ia_pgdata` | `docker compose down -v` |
| **Red** | Red virtual donde los servicios se ven **por su nombre** (`db`, no `localhost`). | `informa-ia_default` | con el `down` |

**Puertos**: `ports: ["5432:5432"]` es `puerto_de_tu_máquina : puerto_dentro_del_contenedor`. Desde
Windows te conectas a `localhost:5432`; desde **otro contenedor** de la misma red, a `db:5432`.

---

## Docker Compose: comandos

| Comando | Para qué |
|---|---|
| 💡 `docker compose up -d` | Levanta todos los servicios en segundo plano. |
| `docker compose up -d db` | Levanta solo uno (y aquellos de los que dependa). |
| 💡 `docker compose ps` | Qué corre, en qué estado y con qué puertos. |
| 💡 `docker compose logs -f db` | Logs en vivo (`-f` = follow, Ctrl+C para salir). `--tail 50` para las últimas 50 líneas. |
| 💡 `docker compose exec db bash` | Abre una shell **dentro** del contenedor. |
| `docker compose restart db` | Reinicia el servicio. |
| `docker compose down` | Para y borra contenedores y red. **Los datos del volumen sobreviven.** |
| ⚠️ `docker compose down -v` | Lo anterior **+ borra los volúmenes**: pierdes los datos y se regeneran desde `db/init/`. |
| `docker compose config` | Muestra el YAML ya resuelto, con las variables sustituidas. Útil para depurar. |
| `docker compose build` / `up --build` | Reconstruye tus imágenes tras cambiar el `Dockerfile`. |

**Fuera de compose**

```bash
docker ps -a                  # contenedores, incluidos los parados
docker images                 # imágenes descargadas
docker volume ls              # volúmenes
docker stats                  # CPU/RAM en vivo
docker system df              # cuánto disco ocupa Docker
docker system prune -a        # ⚠️ limpieza a fondo de todo lo que no se esté usando
```

**El `healthcheck`** hace que `docker compose ps` diga `healthy` en vez de solo `running`, y permite que
otro servicio espere con `depends_on: {db: {condition: service_healthy}}`. Sin eso, la API arrancaría
antes que la base de datos y fallaría al conectar.

---

## PostgreSQL en contenedor y psql

**El truco de la carga inicial**: la imagen oficial ejecuta todo lo que encuentre en
`/docker-entrypoint-initdb.d` (`.sh` y `.sql`, por orden alfabético) **solo la primera vez**, cuando la
carpeta de datos está vacía.

⚠️ **Si cambias los SQL de `db/init/`, reiniciar el contenedor NO los vuelve a aplicar.** Hay que borrar
el volumen:

```bash
docker compose down -v; docker compose up -d db
```

**Entrar a la base de datos**

```bash
docker compose exec db psql -U informa -d informa          # psql dentro del contenedor
docker compose exec db pg_isready -U informa -d informa    # ¿acepta conexiones?
```

**Meta-comandos de psql** (empiezan por `\` y no llevan `;`):

| Comando | Qué hace |
|---|---|
| `\l` | Listar bases de datos. |
| `\dn` | Listar esquemas (`erp`, `kb`, `public`). |
| 💡 `\dt erp.*` | Listar las tablas de un esquema. |
| 💡 `\d+ erp.pedidos` | Describir una tabla: columnas, tipos, índices, restricciones y **comentarios**. |
| `\du` | Listar roles/usuarios y sus atributos. |
| `\c informa informa_reader` | Reconectar a otra BD y/o como otro usuario. |
| 💡 `\x` | Vista vertical (una columna por línea): salva la vida con tablas anchas. |
| `\timing` | Muestra cuánto tarda cada consulta. |
| `\e` | Abre la última consulta en un editor. |
| `\q` | Salir. |

**Copias y restauración**

```bash
docker compose exec db pg_dump -U informa informa > backup.sql
docker compose exec -T db psql -U informa -d informa < backup.sql
```

---

## Problemas típicos y su arreglo

| Síntoma | Causa y arreglo |
|---|---|
| Docker Desktop: *"Virtualization support not detected"* | **Mensaje engañoso.** Comprueba primero WSL con `wsl --version`. Si da `REGDB_E_CLASS_NOT_REGISTERED`, WSL no está registrado: como **administrador**, `dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart`, lo mismo con `VirtualMachinePlatform`, reiniciar, y `winget install --id Microsoft.WSL`. |
| Docker: *"Your version of WSL is too old"* | Como administrador, `wsl --update` (o `winget upgrade --id Microsoft.WSL`). Después **Quit Docker Desktop** desde la bandeja y abrirlo de nuevo: cerrar la ventana no basta. |
| Contenedor: `$'\r': command not found` | Un `.sh` guardado con saltos de línea **CRLF** de Windows. Arreglo permanente: `*.sh text eol=lf` en `.gitattributes` y `"files.eol": "\n"` en VS Code. |
| `port is already allocated` (5432) | Ya hay algo escuchando ahí (otro Postgres). `docker compose down`, o cambia el mapeo a `"5433:5432"` y conéctate al 5433. |
| Cambié `schema.sql` y no se aplica | El volumen ya tenía datos: `docker compose down -v; docker compose up -d db`. |
| `ModuleNotFoundError: informa` | Falta el `[build-system]` en `pyproject.toml`, o no has hecho `uv sync`: con layout `src/` el paquete tiene que estar instalado. |
| Ruff `I001` | Imports desordenados: `uv run ruff check --fix .`. |
| `uv run` usa el Python equivocado | Borra `.venv/` y vuelve a hacer `uv sync`; revisa `requires-python` en el `pyproject.toml`. |
