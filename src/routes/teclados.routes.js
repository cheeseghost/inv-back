import { Router } from "express";
import {CheckAuth,CheckRol} from "../middlewares/auth"
const router=Router()

import * as tecladoControllers from "../controllers/Teclados.controllers"

router.post("/",[CheckAuth,CheckRol],tecladoControllers.createTeclado)

router.get("/",[CheckAuth,CheckRol],tecladoControllers.getTeclado)

router.get("/all",[CheckAuth,CheckRol],tecladoControllers.allTeclado)

router.post("/filt",[CheckAuth,CheckRol],tecladoControllers.filtTeclados)

router.get("/:id_tec",[CheckAuth,CheckRol],tecladoControllers.getTecladoById)

router.put("/:id_tec",[CheckAuth,CheckRol],tecladoControllers.updateTecladoById)

router.delete("/:id_tec",[CheckAuth,CheckRol],tecladoControllers.deleteTecladoById)

export default router;