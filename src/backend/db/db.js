import pkg from 'pg';
const { Pool } = pkg;

// Configurer les paramètres de connexion
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'RH-DB',
  password: 'root',
  port: 5432, // Port par défaut de PostgreSQL
});

// Exporter la connexion
export default pool;