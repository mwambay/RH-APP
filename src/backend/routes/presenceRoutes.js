import express from 'express';
import { getQRCode} from '../controllers/presenceController.js';

const router = express.Router();

router.post('/scan', getQRCode);

export default router;
