import { Router } from "express";
import {CheckAuth,CheckRol} from "../middlewares/auth"
const router=Router()

import * as pantallaControllers from "../controllers/Pantallas.controllers"

router.post("/",[CheckAuth,CheckRol],pantallaControllers.createPantalla)

router.get("/",pantallaControllers.getPantalla)

router.get("/:id_pan",pantallaControllers.getPantallaById)

router.put("/:id_pan",[CheckAuth,CheckRol],pantallaControllers.updatePantallaById)

router.delete("/:id_pan",[CheckAuth,CheckRol],pantallaControllers.deletePantallaById)

export default router;