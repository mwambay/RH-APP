import express from 'express';
import { getQRCode, getPresence} from '../controllers/presenceController.js';

const router = express.Router();

router.post('/scan', getQRCode);
router.get('/get', getPresence);

export default router;
