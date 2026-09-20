-- Fuentes de información "corporativas" que el servicio consulta pero NO posee:
--   erp: datos transaccionales (clientes, pedidos, incidencias)
--   kb:  base documental (políticas, SLA, actas)
CREATE SCHEMA erp;
CREATE SCHEMA kb;

CREATE TABLE erp.clientes (
    id        integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre    text NOT NULL UNIQUE,
    sector    text NOT NULL,
    provincia text NOT NULL,
    alta      date NOT NULL
);

CREATE TABLE erp.productos (
    id        integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre    text NOT NULL UNIQUE,
    categoria text NOT NULL,
    precio    numeric(10, 2) NOT NULL CHECK (precio > 0)
);

CREATE TABLE erp.pedidos (
    id         integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cliente_id integer NOT NULL REFERENCES erp.clientes (id),
    fecha      date NOT NULL,
    estado     text NOT NULL
        CHECK (estado IN ('pendiente', 'enviado', 'entregado', 'cancelado'))
);

CREATE TABLE erp.lineas_pedido (
    pedido_id       integer NOT NULL REFERENCES erp.pedidos (id),
    producto_id     integer NOT NULL REFERENCES erp.productos (id),
    cantidad        integer NOT NULL CHECK (cantidad > 0),
    precio_unitario numeric(10, 2) NOT NULL,
    PRIMARY KEY (pedido_id, producto_id)
);

CREATE TABLE erp.incidencias (
    id         integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cliente_id integer NOT NULL REFERENCES erp.clientes (id),
    abierta_en timestamptz NOT NULL,
    cerrada_en timestamptz CHECK (cerrada_en >= abierta_en),
    prioridad  text NOT NULL CHECK (prioridad IN ('baja', 'media', 'alta')),
    categoria  text NOT NULL
);

-- Índices en las columnas por las que más se filtra y se hace JOIN
CREATE INDEX ix_pedidos_cliente ON erp.pedidos (cliente_id);
CREATE INDEX ix_pedidos_fecha ON erp.pedidos (fecha);
CREATE INDEX ix_incidencias_cliente ON erp.incidencias (cliente_id);

CREATE TABLE kb.documentos (
    id        integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    titulo    text NOT NULL,
    contenido text NOT NULL,
    -- Columna calculada con el texto ya "tokenizado" para búsqueda en español
    tsv       tsvector GENERATED ALWAYS AS (to_tsvector('spanish', titulo || ' ' || contenido)) STORED
);
CREATE INDEX ix_documentos_tsv ON kb.documentos USING gin (tsv);

-- Los comentarios los lee describe_erp_schema: son documentación para el LLM
COMMENT ON COLUMN erp.clientes.sector IS 'Hostelería | Retail | Industria | Salud | Educación';
COMMENT ON COLUMN erp.pedidos.estado IS 'pendiente | enviado | entregado | cancelado';
COMMENT ON COLUMN erp.lineas_pedido.precio_unitario IS
    'Precio en euros aplicado en ese pedido. Importe de la línea = cantidad * precio_unitario';
COMMENT ON COLUMN erp.incidencias.cerrada_en IS 'NULL si la incidencia sigue abierta';
COMMENT ON COLUMN erp.incidencias.prioridad IS 'baja | media | alta';

-- Mínimo privilegio: el lector solo puede LEER estos dos esquemas, nada más
GRANT USAGE ON SCHEMA erp, kb TO informa_reader;
GRANT SELECT ON ALL TABLES IN SCHEMA erp, kb TO informa_reader;
