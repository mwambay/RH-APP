import express from 'express';
import { getDashboardInfo } from '../controllers/dashboardController.js';

const router = express.Router();

router.post('/info', getDashboardInfo);

export default router;
