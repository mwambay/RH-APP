import express from 'express';
import { getCongeInfo,postDemandeConge,putApprouverDemandeConge,postmisAjourConge } from '../controllers/congesController.js';

const router = express.Router();

// Utilisation de la méthode GET
router.get('/info', getCongeInfo);
router.post('/demande', postDemandeConge);
router.put('/approuver', putApprouverDemandeConge);
router.post('/update', postmisAjourConge);
export default router;
