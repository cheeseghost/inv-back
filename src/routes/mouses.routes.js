import { Router } from "express";
import { CheckAuth, CheckRol } from "../middlewares/auth"
const router = Router()

import * as mousesControllers from "../controllers/Mouses.controllers"

router.post("/", [CheckAuth, CheckRol], mousesControllers.createMouse)

router.get("/", mousesControllers.getMouse)

router.get("/:id_mou", mousesControllers.getMouseById)

router.put("/:id_mou", [CheckAuth, CheckRol], mousesControllers.updateMouseById)

router.delete("/:id_mou", [CheckAuth, CheckRol], mousesControllers.deleteMouseById)


export default router;