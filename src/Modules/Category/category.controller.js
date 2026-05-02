import {Router} from 'express';
import * as CategoryService from "./category.service.js"
import {auth} from "../../Middleware/auth.middleware.js";
const router = Router()

router.post("/AddCategory", auth, CategoryService.AddCategory)

router.get("/ShowCategory/:categoryName", CategoryService.ShowCategory)

router.get("/ShowAllCategories", CategoryService.ShowAllCategories)

router.get("/ShowByCategoryId/:categoryId", CategoryService.ShowByCategoryId)

router.put("/updateCategory/:categoryId", auth, CategoryService.updateCategory)

router.delete("/removeCategory/:categoryId", auth, CategoryService.removeCategory)

export default router;