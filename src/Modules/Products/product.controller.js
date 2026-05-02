import { Router } from "express";
import * as ProductService from "./product.service.js"
import { auth } from "../../Middleware/auth.middleware.js";
import { fileUpload } from "../../Middleware/multer.js";


const router = Router()


router.post("/AddProduct", auth, fileUpload().single('image'), ProductService.AddProduct);

router.get("/ShowById/:id", ProductService.ShowById);

router.get("/ShowProduct/:productName", ProductService.ShowProduct)

router.get("/ShowAllProducts", ProductService.ShowAllProducts)


router.put("/UpdateProduct/:ProductId", auth, ProductService.updateProduct)

router.delete("/RemoveProduct/:ProductId", auth, ProductService.RemoveProduct)


export default router;