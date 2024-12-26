import express from 'express';
import { getCongeInfo } from '../controllers/congesController.js';

const router = express.Router();

router.get('/', getCongeInfo);

export default router;
