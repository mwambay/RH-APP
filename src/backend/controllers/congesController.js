import { conges } from '../db/db.js';

export const getCongeInfo = async (req, res) => {
    try {
        const total = await conges();
        console.log('Données brutes des congés:', total); // Debug
        res.json(total); // Pas besoin de reformater si les clés correspondent déjà
    } catch (error) {
        console.error('Erreur dans getCongeInfo:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};
