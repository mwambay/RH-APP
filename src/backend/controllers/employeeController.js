import { totalEmploye, recupererEmploye, getDepartement, insertEmployee } from '../db/db.js';


export const getEmployees = async (req, res) => {
    try {
      const employes = await recupererEmploye();
      if (!employes.length) {
        return res.status(404).json({ message: 'Aucun employé trouvé' });
      }
      const tableau = employes.map(employe => ({
        nom: employe.first_name,
        email: employe.email,
        departement: employe.department_name,
        poste: employe.poste,
        statut: employe.status,
        salaire: employe.salary,
        contrat: employe.contract_type,
        lastName: employe.last_name,
      }));
      res.status(200).json({ data: tableau });
    } catch (error) {
      console.error('Erreur dans getEmployees:', error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  };
  
  export const addEmployee = async (req, res) => {
    try {
      await insertEmployee(req.body);
      res.status(201).json({ message: 'Employé ajouté avec succès' });
    } catch (error) {
      console.error('Erreur dans addEmployee:', error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  };