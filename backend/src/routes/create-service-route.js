import { Router } from 'express';
import { createServiceControler } from '../controllers/create-service-controler.js';

const router = Router();

router.post("/", createServiceControler);

export default router;
