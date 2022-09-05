import { Router } from "express";
import {CheckAuth,CheckRol} from "../middlewares/auth"
const router=Router()

import * as tieneControllers from "../controllers/Tienes.controllers"

router.get("/",[CheckAuth,CheckRol],tieneControllers.getTienes)


export default router;