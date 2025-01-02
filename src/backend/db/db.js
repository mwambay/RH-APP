import pool from '../db/config.js';

export async function totalEmploye() {
  const query = 'SELECT COUNT(*) FROM employees';
  try {
    const result = await pool.query(query);
    return result.rows[0].count;
  } catch (err) {
    console.error('Error fetching total employees:', err.message);
    throw err;
  }
}

export async function recupererEmploye() {
  const query = `
    SELECT 
      e.id, e.first_name, e.last_name, e.email, e.department_id, 
      d.name AS department_name, e.contract_type, e.status, e.salary, 
      e.position_id, p.name AS poste
    FROM employees e
    INNER JOIN departments d ON e.department_id = d.id
    INNER JOIN positions p ON e.position_id = p.id
  `;
  try {
    const result = await pool.query(query);
    return result.rows.length ? result.rows : [];
  } catch (err) {
    console.error('Error fetching employees:', err.message);
    throw new Error('Error fetching employees.');
  }
}

export async function totalPresent() {
  const query = 'SELECT COUNT(*) FROM employees WHERE present = true';
  try {
    const result = await pool.query(query);
    return result.rows[0].count;
  } catch (err) {
    console.error('Error fetching total present employees:', err.message);
    throw err;
  }
}

export async function updateEmp(id, data) {
  const updateQuery = `
    UPDATE employees
    SET 
      first_name = $1, last_name = $2, email = $3, department_id = $4, 
      position_id = $5, salary = $6, contract_type = $7
    WHERE id = $8
    RETURNING *
  `;

  try {
    const departmentId = await getOrCreateDepartmentId(data.department);
    const positionId = await getOrCreatePositionId(data.position);

    const values = [
      data.firstName, data.lastName, data.email, departmentId, 
      positionId, data.salary, data.contrat, id
    ];

    const result = await pool.query(updateQuery, values);
    if (result.rowCount === 0) {
      console.log('No employee found with this ID.');
      return null;
    }
    return result.rows[0];
  } catch (err) {
    console.error('Error updating employee:', err.message);
    throw new Error('Error updating employee.');
  }
}

export async function deleteEmployee(id) {
  const query = 'DELETE FROM employees WHERE id = $1 RETURNING *';
  try {
    const result = await pool.query(query, [id]);
    if (result.rowCount === 0) {
      console.log('No employee found with this ID.');
      return null;
    }
    return result.rows[0];
  } catch (err) {
    console.error('Error deleting employee:', err.message);
    throw new Error('Error deleting employee.');
  }
}

export async function getDepartement() {
  const query = 'SELECT * FROM departments';
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    console.error('Error fetching departments:', err.message);
    throw err;
  }
}

export async function insertEmployee(data) {
  try {
    const departmentId = await getOrCreateDepartmentId(data.department);
    const positionId = await getOrCreatePositionId(data.position);

    const query = `
      INSERT INTO employees (
        first_name, last_name, email, department_id, position_id, salary, contract_type
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `;
    const values = [
      data.firstName, data.lastName, data.email, departmentId, 
      positionId, data.salary, data.contrat
    ];

    const result = await pool.query(query, values);
    return result.rows[0].id;
  } catch (err) {
    console.error('Error inserting employee:', err.message);
    throw new Error('Error inserting employee.');
  }
}

async function getOrCreateDepartmentId(departmentName) {
  const query = 'SELECT id FROM departments WHERE name = $1';
  const insertQuery = 'INSERT INTO departments (name, description) VALUES ($1, $2) RETURNING id';
  try {
    const result = await pool.query(query, [departmentName]);
    if (result.rows.length > 0) {
      return result.rows[0].id;
    } else {
      const newDepartment = await pool.query(insertQuery, [departmentName, 'Automatically added department.']);
      return newDepartment.rows[0].id;
    }
  } catch (err) {
    console.error('Error fetching or creating department:', err.message);
    throw err;
  }
}

async function getOrCreatePositionId(positionName) {
  const query = 'SELECT id FROM positions WHERE name = $1';
  const insertQuery = 'INSERT INTO positions (name, description) VALUES ($1, $2) RETURNING id';
  try {
    const result = await pool.query(query, [positionName]);
    if (result.rows.length > 0) {
      return result.rows[0].id;
    } else {
      const newPosition = await pool.query(insertQuery, [positionName, 'Automatically added position.']);
      return newPosition.rows[0].id;
    }
  } catch (err) {
    console.error('Error fetching or creating position:', err.message);
    throw err;
  }
}

export async function demandeConge(getIdEmploye, data) {
  const query = `
    INSERT INTO leave_requests (employee_id, leave_type, start_date, end_date, status)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  const values = [
    getIdEmploye(data.email), data.leaveType, data.startDate, data.endDate, 'pending'
  ];
  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    console.error('Error inserting leave request:', err.message);
    throw new Error('Error inserting leave request.');
  }
}

export async function approuverDemandeConge(getIdEmploye) {
  const query = 'UPDATE leave_requests SET status = \'approved\' WHERE id = $1 RETURNING *';
  try {
    const result = await pool.query(query, [getIdEmploye]);
    return result.rows[0];
  } catch (err) {
    console.error('Error approving leave request:', err.message);
    throw new Error('Error approving leave request.');
  }
}

export async function misAjourConge(getIdEmploye, data) {
  const query = `
    UPDATE leave_requests
    SET leave_type = $1, start_date = $2, end_date = $3
    WHERE id = $4
    RETURNING *
  `;
  const values = [data.leaveType, data.startDate, data.endDate, getIdEmploye(data.email)];
  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    console.error('Error updating leave request:', err.message);
    throw new Error('Error updating leave request.');
  }
}

export async function conges() {
  const query = `
    SELECT 
      e.first_name || ' ' || e.last_name AS full_name, 
      lr.leave_type, lr.start_date, lr.end_date, lr.status
    FROM leave_requests lr
    JOIN employees e ON lr.employee_id = e.id
  `;
  try {
    const result = await pool.query(query);
    return result.rows.length ? result.rows : [];
  } catch (err) {
    console.error('Error fetching leave requests:', err.message);
    throw new Error('Error fetching leave requests.');
  }
}

export async function pay() {
  const query = `
    SELECT 
      e.first_name || ' ' || e.last_name AS employee_name, 
      sh.effective_date AS pay_period, sh.salary AS base_salary, 
      COALESCE(SUM(eb.benefit_amount), 0) AS total_benefit, 
      (sh.salary + COALESCE(SUM(eb.benefit_amount), 0)) AS total_pay 
    FROM employees e
    JOIN salary_history sh ON e.id = sh.employee_id
    LEFT JOIN employee_benefits eb ON e.id = eb.employee_id AND eb.periode = sh.effective_date 
    GROUP BY e.id, e.first_name, e.last_name, sh.effective_date, sh.salary
    ORDER BY sh.effective_date DESC, employee_name
  `;
  try {
    const result = await pool.query(query);
    return result.rows.length ? result.rows : [];
  } catch (err) {
    console.error('Error fetching pay:', err.message);
    throw new Error('Error fetching pay.');
  }
}
