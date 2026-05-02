import { Router } from "express";
import * as CartService from "./cart.service.js"
import { auth } from "../../Middleware/auth.middleware.js";


const router = Router();

router.post("/add-to-cart", auth, CartService.AddToCart);

router.patch("/UpdateCart/:productId", auth, CartService.UpdateCart);

router.get("/ShowCart", auth, CartService.ShowCart);

router.delete('/RemoveFromCart/:productId', auth, CartService.RemoveFromCart);



export default router;