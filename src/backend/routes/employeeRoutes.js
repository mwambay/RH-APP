import express from 'express';
import { getEmployees, addEmployee } from '../controllers/employeeController.js';

const router = express.Router();

router.post('/get', getEmployees);
router.post('/add', addEmployee);

export default router;
