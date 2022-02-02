import express from 'express';
import { createSessionHandler } from '../controllers/auth.controllers';
import validateResources from '../middlewares/validateResources';
import { createSessionSchema } from '../schemas/auth.schemas';

const router = express.Router();

router.post(
  '/api/sessions',
  validateResources(createSessionSchema),
  createSessionHandler
);

export default router;
