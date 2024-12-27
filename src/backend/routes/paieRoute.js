import express from 'express';
import { getPayInfo } from '../controllers/paieController.js';

const router = express.Router();

// Utilisation de la méthode GET
router.get('/info', getPayInfo);

export default router;