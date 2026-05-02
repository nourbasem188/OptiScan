import {Router} from "express";
import * as OrderService from "./order.service.js";
import { auth } from "../../Middleware/auth.middleware.js";

const router = Router();

router.post("/CreateOrder", auth, OrderService.CreateOrder);

export default router;