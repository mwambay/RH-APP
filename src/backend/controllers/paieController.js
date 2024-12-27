import { pay } from '../db/db.js';

export const getPayInfo = async (req, res) => {
    try {
        const total = await pay();
        console.log('Données brutes des paiemennts:', total); // Debug
        res.json(total); // Pas besoin de reformater si les clés correspondent déjà
    } catch (error) {
        console.error('Erreur dans getPay:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};
