import express from 'express';
import { getCongeInfo } from '../controllers/congesController.js';

const router = express.Router();

// Utilisation de la méthode GET
router.get('/info', getCongeInfo);

export default router;
