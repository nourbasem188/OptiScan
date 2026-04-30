import { Router } from "express";
import * as UserService from "./user.service.js"

const router=Router()

router.post("/signUp",UserService.signUp);

router.post("/logIn",UserService.logIn)



export default router;