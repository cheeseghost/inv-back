import { Router } from "express";
import {CheckAuth,CheckRol} from "../middlewares/auth"
const router=Router()

import * as tecladoControllers from "../controllers/Teclados.controllers"

router.post("/",[CheckAuth,CheckRol],tecladoControllers.createTeclado)

router.get("/",tecladoControllers.getTeclado)

router.get("/:id_tec",tecladoControllers.getTecladoById)

router.put("/:id_tec",[CheckAuth,CheckRol],tecladoControllers.updateTecladoById)

router.delete("/:id_tec",[CheckAuth,CheckRol],tecladoControllers.deleteTecladoById)

export default router;