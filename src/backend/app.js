import express from 'express';
import cors from 'cors';
import pool from './db/db.js';
const app = express();
app.use(cors()); // activer CORS
app.use(express.json()); //parser les requêtes JSON

app.listen(3000, () => console.log('Server is running...'));
let count = 0;

app.post('/dashbord-info', (req, res) => {
    count++;
    const dashbord = {'present' : count, 'taux' : count / 100, 'conges' : count * 9, 'employe' : count + 9}
    console.log('Received request on /hey');
    console.log(req.body)
    res.json(dashbord);
});


// Route pour créer une table
async function  createTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    try {
      await pool.query(createTableQuery);
      console.log('Table "users" créée avec succès.');
    } catch (err) {
      console.error(err.message);
      console.log('Erreur lors de la création de la table.');
    }
  };
createTable();




// Exemple : Route pour récupérer des données
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users'); // Remplacez "users" par le nom de votre table
    res.json(result.rows); // Renvoie les résultats au format JSON
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

// Exemple : Route pour ajouter des données
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    res.status(201).json(result.rows[0]); // Renvoie le nouvel utilisateur
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

