import express from 'express';
import { createAccountHandler } from '../controllers/accounts.controllers';
import validateResources from '../middlewares/validateResources';
import { createAccountSchema } from '../schemas/accounts.schemas';

const router = express.Router();

router.post(
  '/api/accounts',
  validateResources(createAccountSchema),
  createAccountHandler
);

export default router;
