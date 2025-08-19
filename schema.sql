DROP TABLE IF EXISTS pacientes;

CREATE TABLE IF NOT EXISTS pacientes (
    cc VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    edad INT NOT NULL,
    peso NUMERIC(5,2) NOT NULL,
    altura NUMERIC(3,2) NOT NULL,
    genero VARCHAR(10),
    imc NUMERIC(4,2)
);

CREATE OR REPLACE FUNCTION calcular_imc_trigger()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.altura IS NOT NULL AND NEW.altura > 0 THEN
        NEW.imc := ROUND(NEW.peso / (NEW.altura * NEW.altura), 2);
    ELSE
        NEW.imc := NULL;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_before_insert_paciente
BEFORE INSERT ON pacientes
FOR EACH ROW
EXECUTE FUNCTION calcular_imc_trigger();

ALTER TABLE pacientes OWNER TO calculadora_imc;


INSERT INTO pacientes (cc, nombre, apellido, edad, peso, altura, genero)
VALUES 
('3001', 'Ana', 'López', 30, 65.5, 1.68, 'Femenino'),
('3002', 'Carlos', 'Gómez', 28, 70.5, 1.75, 'Masculino'),
('3003', 'Lucía', 'Martínez', 35, 95.0, 1.60, 'Femenino'),
('3004', 'Juan', 'Díaz', 22, 48.0, 1.72, 'Masculino'),
('3005', 'María', 'Fernández', 40, 82.3, 1.70, 'Femenino'),
('3006', 'Pedro', 'Ramírez', 50, 110.0, 1.78, 'Masculino'),
('3007', 'Sofía', 'Torres', 19, 52.0, 1.65, 'Femenino'),
('3008', 'Andrés', 'Pérez', 33, 76.0, 1.80, 'Masculino');

\echo '>>> se ejecuto el schema.sql correctamente".'