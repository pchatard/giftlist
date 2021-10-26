import express from 'express';
import cors from 'cors';
import { authenticate } from '../middlewares/authenticate';
import auth from './auth';
import users from './users';
import lists from './lists';
import gifts from './gifts';

const router = express.Router();

router.use(cors());

/** Authentication router */
router.use('/auth', auth);

/** Authentication middleware */
router.use(authenticate);

/** Users router */
router.use('/users', users);

/** Lists router */
router.use('/lists', lists);

/** Gifts router */
router.use('/gifts', gifts);

export default router;
