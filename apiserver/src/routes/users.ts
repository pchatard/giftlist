import express from 'express';
import UserController from '../controllers/UserController';

const users = express.Router();

/** Gets current user information */
users.get('/me', UserController.me);

export default users;
