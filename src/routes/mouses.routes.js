import { Router } from "express";
import { CheckAuth, CheckRol } from "../middlewares/auth"
const router = Router()

import * as mousesControllers from "../controllers/Mouses.controllers"

router.post("/", [CheckAuth, CheckRol], mousesControllers.createMouse)

router.get("/", [CheckAuth, CheckRol], mousesControllers.getMouse)

router.get("/all", [CheckAuth, CheckRol],mousesControllers.allMouse)

router.post("/filt",[CheckAuth,CheckRol],mousesControllers.filtMouses)

router.get("/:id_mou", [CheckAuth, CheckRol], mousesControllers.getMouseById)

router.put("/:id_mou", [CheckAuth, CheckRol], mousesControllers.updateMouseById)

router.delete("/:id_mou", [CheckAuth, CheckRol], mousesControllers.deleteMouseById)


export default router;