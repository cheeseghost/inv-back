import { Router } from "express";
import {CheckAuth,CheckRol} from "../middlewares/auth"
const router=Router()

import * as torreControllers from "../controllers/Torres.controllers"

router.post("/",[CheckAuth,CheckRol],torreControllers.createTorre)

router.get("/",torreControllers.getTorre)

router.get("/:id_tor",torreControllers.getTorreById)

router.put("/:id_tor",[CheckAuth,CheckRol],torreControllers.updateTorreById)

router.delete("/:id_tor",[CheckAuth,CheckRol],torreControllers.deleteTorreById)

export default router;