import express from 'express';
import AuthController from '../controllers/AuthController';

const auth = express.Router();

/** Registers a new user */
auth.post('/local/register', AuthController.register);

/** Logs a user in */
auth.post('/local/login', AuthController.login);

/** Logs a user out */
auth.get('/local/signout', AuthController.signout);

export default auth;
