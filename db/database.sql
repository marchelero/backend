CREATE DATABASE dbEjemplo;

USE dbEjemplo;
-- USERS TABLE
CREATE TABLE ejemplo
(
    id INT(11) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(45) DEFAULT NULL,
    detalle VARCHAR(45) DEFAULT NULL, 
    PRIMARY KEY(id)
);

DESCRIBE ejemplo;

INSERT INTO ejemplo values 
  (1, 'Primer Nombre', 'Primer Detalle'),
  (2, 'Segundo Nombre', 'Segundo Detalle' ),
  (3, 'Tercer Nombre', 'Tercer Detalle');

SELECT * FROM ejemplo;


