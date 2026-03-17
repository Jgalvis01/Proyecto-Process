-- Consultar organizaciones existentes
SELECT id, nombre FROM org;

-- Si no hay organizaciones, crear una por defecto
INSERT INTO org (nombre) 
VALUES ('Organización Principal')
ON CONFLICT DO NOTHING
RETURNING id, nombre;
