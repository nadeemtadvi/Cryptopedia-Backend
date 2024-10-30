import express from 'express'
import { getalldata, getUser, UserDelete } from '../controllers/dashboard.js';
import { isAdmin } from '../middleware/isAdmin.js';

const DashboardRoute = express.Router()

DashboardRoute.get('/', isAdmin, getalldata) 
DashboardRoute.get('/users', isAdmin, getUser) 
DashboardRoute.delete('/deleteuser/:id', isAdmin, UserDelete) 

export default DashboardRoute;