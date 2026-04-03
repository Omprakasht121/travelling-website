import express from 'express';
import {  login, register, getMe, updateProfile, changePassword } from '../controllers/user-controller.js';
import { verifyToken } from '../middlewares/auth.js';

export const userRoutes = express.Router();

userRoutes.post('/login',login);
userRoutes.post('/register',register);

userRoutes.get('/me', verifyToken, getMe);
userRoutes.put('/update', verifyToken, updateProfile);
userRoutes.put('/change-password', verifyToken, changePassword);