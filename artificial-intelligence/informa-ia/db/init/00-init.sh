#!/bin/bash
# Docker ejecuta este script la PRIMERA vez que arranca Postgres (volumen vacío).
# En CI lo lanzamos a mano, con las variables PGHOST/PGPASSWORD apuntando al servicio.
set -eo pipefail

SQL_DIR="${SQL_DIR:-/docker-entrypoint-initdb.d/sql}"
PSQL=(psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER")

"${PSQL[@]}" --dbname postgres -f "$SQL_DIR/roles.sql"
"${PSQL[@]}" --dbname postgres -c "CREATE DATABASE informa_test"

# La misma estructura y los mismos datos en la BD de desarrollo y en la de tests
for db in "$POSTGRES_DB" informa_test; do
  for file in schema.sql seed.sql kb.sql; do
    "${PSQL[@]}" --dbname "$db" -f "$SQL_DIR/$file"
  done
done
