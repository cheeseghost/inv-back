import { Router } from "express";
const router=Router()

import * as userControllers from "../controllers/Users.controllers"
import {CheckAuth,CheckRol,CerrUser} from "../middlewares/auth"

router.post("/register",[CheckAuth,CheckRol],userControllers.createUser)

router.post("/login",userControllers.loginUser)

router.get("/login",[CheckAuth,CheckRol],userControllers.sesionUser)

router.get("/home",[CheckAuth,CheckRol],userControllers.getUser)

router.get("/get/:id_per",[CheckAuth,CheckRol],userControllers.getUserById)

router.get("/exit",userControllers.exUser)

router.put("/update/:id_per",[CheckAuth,CheckRol],userControllers.updateUser)

router.delete("/delete/:id_per",[CheckAuth,CheckRol],userControllers.deleteUser)



export default router;