import { VerifyToken } from "./Token"

const CheckAuth = async (req, res, next) => {

    const authorization = req.get("authorization")
    if (authorization && authorization.toLowerCase().startsWith("bearer")) {
        const token = authorization.substring(7)
        const decodeT = await VerifyToken(token)
        if (decodeT.id_per) {
            next();
        } else {
            res.status(409)
            res.send({ error: "token expirado" })
        }


    } else {
        res.status(409)
        res.send({ error: "token expirado" })
    }
}

const CheckRol = async (req, res, next) => {
    const authorization = req.get("authorization")
    if (authorization && authorization.toLowerCase().startsWith("bearer")) {
        const token = authorization.substring(7)
        const decodeT = await VerifyToken(token)
        if (decodeT.rol == "admin") {
            next();
        } else {
            res.status(409)
            res.send({ error: "no tienes los permisos necesarios" })
        }


    } else {
        res.status(409)
        res.send({ error: "token expirado" })
    }
}




module.exports = { CheckAuth, CheckRol }