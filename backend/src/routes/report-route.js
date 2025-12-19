import { Router } from 'express';
import { reportController } from '../controllers/report-controler.js';

const router = Router();

router.post("/", reportController);

export default router;
