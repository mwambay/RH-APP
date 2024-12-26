import { getPresences } from '../db/db.js';


export const getQRCode = async (req, res) => {
    console.log(req.body);
    return res.status(200).json({scan : true});

}

export const getPresence = async (req, res) => {
    try {
        const presences = await getPresences();
        const tab = presences.map(presence =>({
            id : presence.id,
            employee : presence.employee,
            arrival_time : presence.arrival_time,
            departure_time : presence.departure_time,
            status : presence.status
        }))
        res.status(200).json({data : tab});
    } catch (error) {
        console.error('Erreur lors de la récupération des présences:', error);
        res.status(500).json({ message: 'Erreur du serveur' });
    }
};