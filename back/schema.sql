-- Tablas de Duby Sazón (la base de datos se crea sola al iniciar el backend).
-- También puedes ejecutarlo a mano sobre una base llamada duby_sazon.

CREATE TABLE IF NOT EXISTS usuarios (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  nombre     VARCHAR(100) NOT NULL,
  email      VARCHAR(150) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS resenas (
  id                 INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id         INT NOT NULL,
  nombre_restaurante VARCHAR(150) NOT NULL,
  calificacion       TINYINT NOT NULL,
  fecha_visita       DATE NOT NULL,
  observaciones      TEXT,
  created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_resena_usuario FOREIGN KEY (usuario_id)
    REFERENCES usuarios(id) ON DELETE CASCADE
) DEFAULT CHARSET = utf8mb4;
