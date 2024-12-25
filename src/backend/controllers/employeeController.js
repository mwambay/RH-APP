import { totalEmploye, recupererEmploye, deleteEmployee, insertEmployee , updateEmp} from '../db/db.js';

export const delEmployee = async (req, res) => {
  try{
    const id = Number(req.body.id)
    await deleteEmployee(id)
    console.log("update reussi");
    return res.status(200).json({del : true});
  }
  catch(error){
    console.log(error);
    return res.status(404).json({message: 'echec de la supression'})
  }
}

export const updateEmployee = async (req, res) => {
  try{
    const id = Number(req.body.id);
    const data = req.body.data;
    const result = await updateEmp(id, data);
    return res.status(200).json({})
  }
  catch(error){
    console.log(error);
    return res.status(404).json({message: 'echec de l\'update'})

  }

}

export const getEmployees = async (req, res) => {
    try {
      const employes = await recupererEmploye();
      if (!employes.length) {
        return res.status(404).json({ message: 'Aucun employé trouvé' });
      }
      const tableau = employes.map(employe => ({
        id: employe.id,
        nom: employe.first_name,
        email: employe.email,
        departement: employe.department_name,
        departement_id: employe.department_id,
        statut: employe.status,
        salaire: employe.salary,
        contrat: employe.contract_type,
        lastName: employe.last_name,
        poste: employe.poste,
        position_id: employe.position_id
      }));

      console.log(tableau)
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