
import { Router } from 'express';



import processFlow from './../controllers/processFlow.controller';


const router = Router();

const controller = new processFlow();

router.post('/process-flow', controller.processFlow.bind(controller));


export default router;
