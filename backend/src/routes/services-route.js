import { Router } from 'express';
import { servicesControler, servicebyIDControler } from '../controllers/services-controler.js';

const router = Router();

router.get("/", servicesControler);
router.get("/:id", servicebyIDControler);

export default router;
