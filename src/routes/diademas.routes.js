import { Router } from "express";
import {CheckAuth,CheckRol} from "../middlewares/auth"
const router=Router()

import * as diademasControllers from "../controllers/Diademas.controllers"

router.post("/",[CheckAuth,CheckRol],diademasControllers.createDiadema)

router.get("/",[CheckAuth,CheckRol],diademasControllers.getDiadema)

router.get("/all",[CheckAuth,CheckRol],diademasControllers.allDiadema)

router.get("/:id_dia",[CheckAuth,CheckRol],diademasControllers.getDiademaById)

router.put("/:id_dia",[CheckAuth,CheckRol],diademasControllers.updateDiademaById)

router.delete("/:id_dia",[CheckAuth,CheckRol],diademasControllers.deleteDiademaById)

export default router;