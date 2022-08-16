import { signedCookies } from "cookie-parser";
import { Cookie } from "express-session";
import { VerifyToken } from "./Token"



const CheckAuth = async (req, res, next) => {
    if (req.session.user) {
        const decodeT = await VerifyToken(req.session.user.token)
        if (decodeT.id_per) {
            next();
        } else {
            res.status(409)
            res.send({ error: "token expirado" })
        }


    } else {
        res.send({loggedIn:false})
    }
}

const CheckRol = async (req, res, next) => {
    if (req.session.user) {
        const decodeT = await VerifyToken(req.session.user.token)
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

const CerrUser= (req,res)=>{


}





module.exports = { CheckAuth, CheckRol,CerrUser }