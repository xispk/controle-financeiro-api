import express from 'express';
import {
  createUserHandler,
  getCurrentUserHandler,
} from '../controllers/users.controllers';
import validateResources from '../middlewares/validateResources';
import { createUserSchema } from '../schemas/users.schemas';

const router = express.Router();

router.post(
  '/api/users',
  validateResources(createUserSchema),
  createUserHandler
);

router.get('/api/users/getcurrentuser', getCurrentUserHandler);

export default router;
