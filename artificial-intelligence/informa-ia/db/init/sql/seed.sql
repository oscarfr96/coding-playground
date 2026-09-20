-- Datos de ejemplo generados con SQL puro. setseed hace que random() sea reproducible.
SELECT setseed(0.42);

-- 60 clientes. La subconsulta elige el sector UNA vez por fila para usarlo dos veces.
INSERT INTO erp.clientes (nombre, sector, provincia, alta)
SELECT (ARRAY['Hotel', 'Tienda', 'Talleres', 'Clínica', 'Colegio'])[s] || ' '
           || (ARRAY['Aurora', 'Central', 'Miramar', 'La Plaza', 'Norte', 'Sol', 'Alameda', 'del Río'])
              [1 + floor(random() * 8)::int]
           || ' ' || g,
       (ARRAY['Hostelería', 'Retail', 'Industria', 'Salud', 'Educación'])[s],
       (ARRAY['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao', 'Zaragoza'])
           [1 + floor(random() * 6)::int],
       current_date - (400 + floor(random() * 900)::int)
FROM (SELECT g, 1 + floor(random() * 5)::int AS s FROM generate_series(1, 60) AS g) AS t;

INSERT INTO erp.productos (nombre, categoria, precio) VALUES
    ('Detergente industrial 5L', 'Limpieza', 18.90),
    ('Lejía 2L', 'Limpieza', 2.40),
    ('Bayetas microfibra (pack 10)', 'Limpieza', 7.50),
    ('Guantes nitrilo (caja 100)', 'Limpieza', 9.80),
    ('Vasos compostables (pack 50)', 'Menaje', 6.20),
    ('Servilletas 30x30 (pack 500)', 'Menaje', 11.00),
    ('Cubiertos madera (pack 100)', 'Menaje', 8.40),
    ('Bandejas aluminio (pack 20)', 'Menaje', 5.90),
    ('Café en grano 1kg', 'Alimentación', 16.50),
    ('Aceite de oliva 5L', 'Alimentación', 34.00),
    ('Azúcar sobres (caja 1000)', 'Alimentación', 12.30),
    ('Agua mineral 1,5L (pack 6)', 'Alimentación', 3.10),
    ('Papel A4 (caja 5 paquetes)', 'Papelería', 24.90),
    ('Bolígrafos (caja 50)', 'Papelería', 9.50),
    ('Tóner impresora', 'Papelería', 59.00),
    ('Archivadores (pack 10)', 'Papelería', 17.80),
    ('Dispensador de jabón', 'Equipamiento', 22.00),
    ('Carro de limpieza', 'Equipamiento', 145.00),
    ('Cafetera industrial', 'Equipamiento', 890.00),
    ('Contenedor reciclaje 60L', 'Equipamiento', 48.00);

-- 2000 pedidos del último año. (1 - sqrt(random())) concentra más pedidos en fechas
-- recientes, así los datos muestran una tendencia de crecimiento.
INSERT INTO erp.pedidos (cliente_id, fecha, estado)
SELECT 1 + floor(random() * 60)::int,
       current_date - floor(365 * (1 - sqrt(random())))::int,
       CASE WHEN r < 0.70 THEN 'entregado'
            WHEN r < 0.82 THEN 'enviado'
            WHEN r < 0.92 THEN 'pendiente'
            ELSE 'cancelado' END
FROM (SELECT random() AS r FROM generate_series(1, 2000)) AS t;

-- De 1 a 4 líneas por pedido. El "WHERE p.id IS NOT NULL" hace la subconsulta
-- correlacionada: PostgreSQL la re-ejecuta por cada pedido (productos distintos en cada uno).
INSERT INTO erp.lineas_pedido (pedido_id, producto_id, cantidad, precio_unitario)
SELECT p.id, pr.id, 1 + floor(random() * 12)::int, pr.precio
FROM erp.pedidos AS p
CROSS JOIN LATERAL (
    SELECT id, precio
    FROM erp.productos
    WHERE p.id IS NOT NULL
    ORDER BY random()
    LIMIT 1 + floor(random() * 4)::int
) AS pr;

-- 400 incidencias de los últimos 180 días; el 85 % cerradas. Las de prioridad alta
-- se resuelven antes, pero no siempre dentro del SLA (ver kb.documentos).
INSERT INTO erp.incidencias (cliente_id, abierta_en, cerrada_en, prioridad, categoria)
SELECT t.cliente_id,
       t.abierta_en,
       CASE WHEN random() < 0.85
            THEN least(now(), t.abierta_en + make_interval(hours => (2 + floor(random() * h.horas_max))::int))
       END,
       t.prioridad,
       t.categoria
FROM (
    SELECT 1 + floor(random() * 60)::int AS cliente_id,
           now() - make_interval(hours => floor(random() * 24 * 180)::int) AS abierta_en,
           (ARRAY['baja', 'media', 'alta'])[1 + floor(random() * 3)::int] AS prioridad,
           (ARRAY['Retraso en la entrega', 'Producto dañado', 'Error en factura', 'Pedido incompleto'])
               [1 + floor(random() * 4)::int] AS categoria
    FROM generate_series(1, 400)
) AS t
CROSS JOIN LATERAL (
    SELECT CASE t.prioridad WHEN 'alta' THEN 40 WHEN 'media' THEN 90 ELSE 160 END AS horas_max
) AS h;
