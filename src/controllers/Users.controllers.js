const bcrypt = require("bcrypt")
const { CreateToken } = require("../middlewares/Token")
import UserModel from "../models/User"

export const loginUser = async (req, res) => {
        const { usernam, passe } = req.body
        const user = await UserModel.findOne({ where: { username: usernam } });
        const passwordCorrect = user == null
                ? null
                : await bcrypt.compare(passe, user.pass)
        if (!(passwordCorrect && user)) {
                res.send({ loggedIn: false })
        } else {
                const token = await CreateToken(user)
                req.session.user = {
                        token
                }
                res.send({
                        loggedIn: true, rol:user.rol
                })
        }

}

export const getUser=async(req,res)=>{
        try {
                const use = await UserModel.findAll({
                        attributes: ['id_per','nom_per', 'ced_per','gru_per']
                })
                res.send({user:use})
                
        } catch (error) {
               console.log(error) 
        }
}

export const getUserById= async(req,res)=>{
        try {
                const per = await UserModel.findAll({
                    where: { id_per: req.params.id_per },attributes: ['id_per','nom_per', 'ced_per','gru_per','rol','username']
                });
                res.status(200).json(per[0])
        
            } catch (error) {
                res.json({ message: error.message })
            }
        
}

export const sesionUser = async (req, res) => {
        if(req.session.user){
                res.send({loggedIn:true})
        }else{
                res.send({loggedIn:false})
        }

}

export const exUser = async (req, res) => {
        req.session.destroy()
        res.clearCookie("userId");
        res.send({ loggedIn: false })
        // console.log(req.IncomingMessage[MemoryStore[sessions]])
        // res.send({loggedIn: false,user:req.session})
}

export const createUser = async (req, res) => {
        try{
                const { username, passe, rol, nom_per, ced_per, gru_per } = req.body;
                const user = await UserModel.findOne({ where: { username: username } });
                if (!user) {
                        const saltRounds = 10;
                        const pass = await bcrypt.hash(passe, saltRounds)
                        const newUser = new UserModel({ username, pass, rol, nom_per, ced_per, gru_per });
                        const userSaved = await newUser.save()
                        res.status(201).json(userSaved)
                } else {
                        res.status(400).json("Ya hay otra cuenta con ese usuario!")
                }
        }catch(error){
                console.log(error)
        }
}

export const updateUser = async (req, res) => {
        try {
                console.log(req.body)
                const{username, passe, rol, nom_per, ced_per, gru_per,id_per}= req.body
                if(passe!=""){
                        const saltRounds = 10;
                        const pass = await bcrypt.hash(passe, saltRounds)
                        await UserModel.update({username,pass,rol,nom_per,ced_per,gru_per}, {
                                where: { id_per: id_per}
                        })
                }else{                    
                        console.log(req.params.id_per)   
                        await UserModel.update(req.body, {
                        where: { id_per: req.params.id_per }
                })

                }
                
                res.status(200).json("success")
        } catch (error) {
                res.json({ message: error.message })
        }
}

export const deleteUser = async (req, res) => {
        try {
                await UserModel.destroy({
                        where: { id_per: req.params.id_per }
                })
                res.status(204)
        } catch (error) {
                res.json({ message: error.message })
        }
}