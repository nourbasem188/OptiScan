import { Router } from "express";
import * as ProductService from "./product.service.js"

const router = Router()


router.post("/AddProduct", ProductService.AddProduct)

router.get("/ShowProduct/:productName", ProductService.ShowProduct)

router.delete("/removeProduct/:ProductId",ProductService.removeProduct)


export default router;