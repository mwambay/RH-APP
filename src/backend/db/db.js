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
    SELECT first_name, email, department_id, contract_type, status
    FROM employees;
  `;
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



// Exporter la connexion
export default pool;