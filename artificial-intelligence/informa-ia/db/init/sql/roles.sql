-- Usuario de SOLO LECTURA que usan los conectores. Contraseña solo para desarrollo local.
CREATE ROLE informa_reader LOGIN PASSWORD 'reader_dev';

-- Defensa en profundidad a nivel de base de datos: aunque el código fallase,
-- todas sus transacciones son de solo lectura y ninguna consulta dura más de 10 s.
ALTER ROLE informa_reader SET default_transaction_read_only = on;
ALTER ROLE informa_reader SET statement_timeout = '10s';
