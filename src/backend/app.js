import express from 'express';
import cors from 'cors';
import { totalEmploye, recupererEmploye, getDepartement, insertEmployee } from './db/db.js';

const app = express();
app.use(cors()); // activer CORS
app.use(express.json()); //parser les requêtes JSON

// Fonction asynchrone pour démarrer le serveur
const startServer = async () => {
  const total = await totalEmploye(); // Attendre le résultat de totalEmploye()

  const employes = await recupererEmploye(); // Attendre le résultat de recupererEmploye()
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });

  app.post('/dashbord-info', (req, res) => {
    const dashbord = {
      'present': total,
      'taux': total / 100,
      'conges': total * 9,
      'employe': total
    };
    console.log('Received request on /dashbord-info');
    console.log(req.body);
    res.json(dashbord);
  });

  app.post('/employe-info', async (req, res) => {
    try {
      const employes = await recupererEmploye();  // Appel à la fonction pour récupérer les employés
  
      if (employes.length === 0) {
        return res.status(404).json({ message: 'Aucun employé trouvé' });
      }
      // Formater les données à renvoyer
      const tableau = employes.map(employe => ({
        nom: employe.first_name,
        email: employe.email,
        departement: employe.department_name,
        poste: employe.poste,
        statut: employe.status,
        salaire: employe.salary,
        contrat: employe.contract_type
      }));
      console.log(tableau);
      // Renvoi des données formatées
      return res.status(200).json({ data: tableau });
    } catch (error) {
      console.error('Erreur lors de la récupération des employés:', error);
      return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  });
};

// Démarrer le serveur
startServer();

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

app.post('/add-employees', async (req, res) => {
    console.log(req.body);
    insertEmployee(req.body);
});

app.get('/departments', async (req, res) => {
    const departement = await getDepartement();
    // Formater les données à renvoyer
    const tableau = departement.map(departement => ({
      id: departement.id,
      nom: departement.name,
      description: departement.description
    }));

    // Renvoi des données formatées
    return res.status(200).json({ data: tableau });

});
