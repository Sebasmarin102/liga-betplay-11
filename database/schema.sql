-- Esquema para el proyecto "Liga BetPlay - Arma tu 11"

CREATE DATABASE IF NOT EXISTS liga_betplay_11
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE liga_betplay_11;

CREATE TABLE equipos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  ciudad VARCHAR(100),
  estadio VARCHAR(100),
  escudo_url VARCHAR(255),
  fundacion YEAR,
  color_principal VARCHAR(30)
);

CREATE TABLE jugadores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  equipo_id INT NOT NULL,
  nombre_completo VARCHAR(150) NOT NULL,
  dorsal TINYINT UNSIGNED,
  posicion_general ENUM('Portero', 'Defensa', 'Volante', 'Delantero') NOT NULL,
  posicion_especifica ENUM('POR', 'DFC', 'LD', 'LI', 'MCD', 'MC', 'MCO', 'ED', 'EI', 'DC') NOT NULL,
  fecha_nacimiento DATE,
  nacionalidad VARCHAR(60),
  altura_cm SMALLINT UNSIGNED,
  peso_kg SMALLINT UNSIGNED,
  pie_dominante ENUM('Izquierdo', 'Derecho', 'Ambidiestro'),
  valor_mercado_usd DECIMAL(12, 2),
  foto_url VARCHAR(255),
  FOREIGN KEY (equipo_id) REFERENCES equipos(id) ON DELETE CASCADE,
  INDEX idx_posicion_especifica (posicion_especifica),
  INDEX idx_equipo (equipo_id)
);
