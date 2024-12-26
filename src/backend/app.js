import express from 'express';
import cors from 'cors';
import dashboardRoutes from './routes/dashboardRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import departmentRoutes from './routes/departmentRoutes.js';
import congesRoutes from './routes/congesRoute.js';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/dashboard', dashboardRoutes);
app.use('/employees', employeeRoutes);
app.use('/departments', departmentRoutes);

app.use('/conge', congesRoutes);


export default app;
