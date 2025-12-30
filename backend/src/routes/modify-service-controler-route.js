import { Router } from 'express';
import { modifyServiceControler } from '../controllers/modify-service-controler.js'; 

const router = Router();

router.put("/:id", modifyServiceControler);

export default router;
