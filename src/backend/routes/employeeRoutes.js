import express from 'express';
import { getEmployees, addEmployee, delEmployee, updateEmployee} from '../controllers/employeeController.js';

const router = express.Router();

router.post('/get', getEmployees);
router.post('/add', addEmployee);
router.post('/delete', delEmployee);
router.post('/update', updateEmployee);
export default router;
