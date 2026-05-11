import { Router } from "express";
import * as checkOutService from "./checkOut.service.js";
import { auth } from "../../Middleware/auth.middleware.js";

const router = Router();

router.post("/PlaceOrder", auth, checkOutService.placeOrder);

export default router;