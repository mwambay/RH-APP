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

export async function totalEmploye() {
  const totalEmployeQuery = `
    SELECT COUNT(*) FROM employees
  `;
  try {
    const result = await pool.query(totalEmployeQuery);
    return result.rows[0].count;
  } catch (err) {
    console.error(err.message);
    console.log('Erreur lors de la récupération des données.');
    throw err;
  }
}

export async function recupererEmploye() {
    const recupererEmployeQuery = `
      SELECT 
        employees.first_name, 
        employees.last_name,
        employees.email, 
        departments.name AS department_name, 
        employees.contract_type, 
        employees.status,
        employees.salary,
        employees.poste
      FROM 
        employees
      INNER JOIN 
        departments
      ON 
        employees.department_id = departments.id    `;
    
    try {
      const result = await pool.query(recupererEmployeQuery);
      
      if (!result.rows || result.rows.length === 0) {
        console.log('Aucun employé trouvé');
        return []; // Retourner un tableau vide si aucune donnée n'est trouvée
      }
  
      return result.rows;  // Retourner directement les résultats sous forme de tableau d'objets
    } catch (err) {
      console.error("Erreur lors de la récupération des données:", err.message);
      throw new Error('Erreur lors de la récupération des employés.'); // Lancer une erreur générique à remonter
    }
  }
  



export async function totalPresent() {
  const totalPresentQuery = `
    SELECT COUNT(*) FROM employes WHERE present = true
  `;
  try {
    const result = await pool.query(totalPresentQuery);
    console.log(result.rows);
  } catch (err) {
    console.error(err.message);
    console.log('Erreur lors de la récupération des données.');
  }
}

export async function getDepartement() {
  const departementQuery = `
   select * from departments;
  `;
  try {
    const result = await pool.query(departementQuery);
    return result.rows;

  } catch (err) {
    console.error(err.message);
    console.log('Erreur lors de la récupération des données.');
  }

  
}

// Fonction pour insérer un employé
export async function insertEmployee(data) {
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
          first_name, last_name, email, department_id, position_id, salary, contract_type, poste
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id
      `;
      const values = [
        data.firstName,
        data.lastName,
        data.email,
        departmentId,
        positionId,
        data.salary,
        data.contrat,
        data.position
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
  

// Exporter la connexion
export default pool;