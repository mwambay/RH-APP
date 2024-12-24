import { totalEmploye } from '../db/db.js';

export const getDashboardInfo = async (req, res) => {
  try {
    const total = await totalEmploye();
    const dashboard = {
      present: total,
      taux: total / 100,
      conges: total * 9,
      employe: total,
    };
    res.json(dashboard);
  } catch (error) {
    console.error('Erreur dans getDashboardInfo:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};
