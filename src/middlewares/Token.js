const jwt= require("jsonwebtoken")

const CreateToken= async (user)=>{
    return jwt.sign(
        {
            id_per: user.id_per,
            rol: user.rol
        },
        process.env.CLAVE,
        {
            expiresIn:60*60*9
        }
    );

}

const VerifyToken = async(token)=>{
    try{
        return jwt.verify(token,process.env.CLAVE)
    }catch(e){
        return null
    }
}


module.exports = {CreateToken,VerifyToken}