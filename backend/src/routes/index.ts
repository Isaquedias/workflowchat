

import { Router } from "express";

const router = Router();

import processFlowRouter from "./processFlow.router";

router.use("/api/v1", processFlowRouter);

export default router;

