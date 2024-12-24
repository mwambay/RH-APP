import { getDepartement } from '../db/db.js';

export const getDepartments = async (req, res) => {
  try {
    const departement = await getDepartement();
    const tableau = departement.map(dep => ({
      id: dep.id,
      nom: dep.name,
      description: dep.description,
    }));
    res.status(200).json({ data: tableau });
  } catch (error) {
    console.error('Erreur dans getDepartments:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};
