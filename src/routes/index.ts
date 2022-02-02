import express from 'express';

import users from './users.routes';
import auth from './auth.routes';
import accounts from './accounts.routes';

const router = express.Router();

router.use(users);
router.use(auth);
router.use(accounts);

export default router;
