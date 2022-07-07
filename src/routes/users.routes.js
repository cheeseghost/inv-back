import { Router } from "express";
const router=Router()

import * as userControllers from "../controllers/Users.controllers"
import {CheckAuth,CheckRol} from "../middlewares/auth"

router.post("/register",[CheckAuth,CheckRol],userControllers.createUser)

router.post("/login",userControllers.loginUser)

router.put("/update/:id_per",[CheckAuth,CheckRol],userControllers.updateUser)

router.delete("/delete/:id_per",[CheckAuth,CheckRol],userControllers.deleteUser)



export default router;