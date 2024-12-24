import pkg from 'pg';
const { Pool } = pkg;
// Configuration de la connexion PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'RH-DB',
    password: 'root',
    port: 5432, // Port par défaut de PostgreSQL
  });
  

// Fonction pour insérer un employé
async function insertEmployee(data) {
  try {
    // Vérifiez si le département existe
    const departmentResult = await pool.query(
      'SELECT id FROM departments WHERE name = $1',
      [data.department]
    );

    let departmentId;
    if (departmentResult.rows.length > 0) {
      departmentId = departmentResult.rows[0].id;
    } else {
      // Créez le département si nécessaire
      const newDepartment = await pool.query(
        'INSERT INTO departments (name, description) VALUES ($1, $2) RETURNING id',
        [data.department, 'Département ajouté automatiquement.']
      );
      departmentId = newDepartment.rows[0].id;
    }

    // Vérifiez si le poste existe
    const positionResult = await pool.query(
      'SELECT id FROM positions WHERE name = $1',
      [data.position]
    );

    let positionId;
    if (positionResult.rows.length > 0) {
      positionId = positionResult.rows[0].id;
    } else {
      // Créez le poste si nécessaire
      const newPosition = await pool.query(
        'INSERT INTO positions (name, description) VALUES ($1, $2) RETURNING id',
        [data.position, 'Poste ajouté automatiquement.']
      );
      positionId = newPosition.rows[0].id;
    }

    // Insérez l'employé
    const insertQuery = `
      INSERT INTO employees (
        first_name, last_name, email, department_id, position_id, salary
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `;
    const values = [
      data.firstName,
      data.lastName,
      data.email,
      departmentId,
      positionId,
      data.salary,
    ];

    const result = await pool.query(insertQuery, values);
    console.log('Employé inséré avec succès, ID :', result.rows[0].id);
  } catch (err) {
    console.error('Erreur lors de l\'insertion de l\'employé :', err);
  }
}

// Exemple de données
const newEmployee = {
  firstName: 'Sagesse',
  lastName: 'Mkj',
  email: 'alain@kab',
  position: 'pour',
  department: 'Ressources Humaines',
  salary: 3000,
};

// Insérer un employé
insertEmployee(newEmployee);
