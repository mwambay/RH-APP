import  pool from '../db/config.js';



export async function getPresences() {
  const presencesQuery = `
    SELECT 
      presences.id,
      employees.first_name || ' ' || employees.last_name AS employee,
      presences.arrival_time,
      presences.departure_time,
      presences.status
    FROM 
      presences
    INNER JOIN 
      employees ON presences.employee_id = employees.id
  `;
  try {
    const result = await pool.query(presencesQuery);
    return result.rows;
  } catch (err) {
    console.error('Erreur lors de la récupération des présences:', err.message);
    throw new Error('Erreur lors de la récupération des présences.');
  }
}

getPresences()

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
        employees.id,
        employees.first_name, 
        employees.last_name,
        employees.email, 
        employees.department_id,
        departments.name AS department_name, 
        employees.contract_type, 
        employees.status,
        employees.salary,
        employees.position_id,
        positions.name AS poste
      FROM 
        employees
      INNER JOIN 
        departments
      ON 
        employees.department_id = departments.id    
        
    INNER JOIN 
      positions
    ON 
      employees.position_id = positions.id
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

export async function updateEmp(id, data) {
  console.log(typeof(id), id, data, "hello")
  const updateQuery = `
    UPDATE employees
    SET 
      first_name = $1,
      last_name = $2,
      email = $3,
      department_id = $4,
      position_id = $5,
      salary = $6,
      contract_type = $7
    WHERE id = $8
    RETURNING *
  `;

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

    const values = [
      data.firstName,
      data.lastName,
      data.email,
      departmentId,
      positionId,
      data.salary,
      data.contrat,
      id
    ];

    const result = await pool.query(updateQuery, values);
    if (result.rowCount === 0) {
      console.log('Aucun employé trouvé avec cet ID.');
      return null;
    }
    console.log('Employé mis à jour avec succès, ID :', result.rows[0].id);
    return result.rows[0];
  } catch (err) {
    console.error('Erreur lors de la mise à jour de l\'employé :', err.message);
    throw new Error('Erreur lors de la mise à jour de l\'employé.');
  }
}



export async function deleteEmployee(id) {
  const delQuery = `
    DELETE FROM employees
    WHERE id = $1
    RETURNING *
  `;
  try {
    const result = await pool.query(delQuery, [id]);
    if (result.rowCount === 0) {
      console.log('Aucun employé trouvé avec cet ID.');
      return null;
    }
    console.log('Employé supprimé avec succès, ID :', result.rows[0].id);
    return result.rows[0];
  } catch (err) {
    console.error('Erreur lors de la suppression de l\'employé :', err.message);
    throw new Error('Erreur lors de la suppression de l\'employé.');
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
          first_name, last_name, email, department_id, position_id, salary, contract_type
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
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
      ];
  
      const result = await pool.query(insertQuery, values);
      console.log('Employé inséré avec succès, ID :', result.rows[0].id);
    } catch (err) {
      console.error('Erreur lors de l\'insertion de l\'employé :', err);
    }
  }
  
  export async function EmployerEnConge() {
    
  }
  
  export async function demandeConge() {
    
  }

  export async function approuverDemandeConge(){

  }

  export async function conges() {
    const congesQuery = `
      SELECT 
    e.first_name || ' ' || e.last_name AS full_name, -- Concatène le prénom et le nom
    lr.leave_type,
    lr.start_date,
    lr.end_date,
    lr.status
FROM 
    leave_requests lr
JOIN 
    employees e 
ON 
    lr.employee_id = e.id;
    `;

    try {
      const result = await pool.query(congesQuery);
      
      if (!result.rows || result.rows.length === 0) {
        console.log('Aucun congé trouvé');
        return []; // Retourner un tableau vide si aucune donnée n'est trouvée
      }

      return result.rows;  // Retourner directement les résultats sous forme de tableau d'objets
    } catch (err) {
      console.error("Erreur lors de la récupération des congés:", err.message);
      throw new Error('Erreur lors de la récupération des congés.'); // Lancer une erreur générique à remonter
    }
    
  }
