import { conges, demandeConge, approuverDemandeConge, misAjourConge } from '../db/db.js';

export const getCongeInfo = async (req, res) => {
    try {
        const total = await conges();
        console.log('Données brutes des congés:', total);
        res.json(total);
    } catch (error) {
        console.error('Erreur dans getCongeInfo:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};

export const postDemandeConge = async (req, res) => {
    try {
        console.log('Payload reçu:', req.body);
        const result = await demandeConge(req.body);
        console.log('Résultat de la demande de congé:', result);
        res.json(result);
    } catch (error) {
        console.error('Erreur dans postDemandeConge:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};

export const putApprouverDemandeConge = async (req, res) => {
    try {
        console.log('Payload reçu pour approbation:', req.body);
        const result = await approuverDemandeConge(req.body);
        console.log('Résultat de l\'approbation:', result);
        res.json(result);
    } catch (error) {
        console.error('Erreur dans putApprouverDemandeConge:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};

export const postmisAjourConge = async (req, res) => {
    try {
        console.log('Payload reçu pour mise à jour:', req.body);
        const result = await misAjourConge(req.body);
        console.log('Résultat de la mise à jour:', result);
        res.json(result);
    } catch (error) {
        console.error('Erreur dans postmisAjourConge:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};
