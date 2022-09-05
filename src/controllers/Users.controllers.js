const bcrypt = require("bcrypt")
const { CreateToken } = require("../middlewares/Token")
import UserModel from "../models/User"
import TienesModel from "../models/Tienes";
import DiademaModel from "../models/Diademas";
import MouseModel from "../models/Mouses";
import PantallaModel from "../models/Pantallas";
import TecladoModel from "../models/Teclados";
import TorreModel from "../models/Torres";

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
                const per = await TienesModel.findAll({ 
                        include: [{ model: UserModel, where:{id_per:req.params.id_per},attributes: ['id_per','username','rol','nom_per', 'ced_per','gru_per']}]
                });
                const pan = await PantallaModel.findAll({ 
                       attributes: ['eti_pan','id_pan'],where:{id_pan:per[0].id_pan}
                });
                const tor = await TorreModel.findAll({ 
                        attributes: ['eti_tor','id_tor'],where:{id_tor:per[0].id_tor}
                 });
                 const tec = await TecladoModel.findAll({ 
                        attributes: ['eti_tec','id_tec'],where:{id_tec:per[0].id_tec}
                 });
                 const mou = await MouseModel.findAll({ 
                        attributes: ['eti_mou','id_mou'],where:{id_mou:per[0].id_mou}
                 });
                 const dia = await DiademaModel.findAll({ 
                        attributes: ['eti_dia','id_dia'],where:{id_dia:per[0].id_dia}
                 });
                res.send({persona:per,pantalla:pan,torre:tor,diadema:dia,mouse:mou,teclado:tec})
        
            } catch (error) {
                res.json({ message: error.message })
            }
        
}

export const filtUser= async(req,res)=>{
        try {
            
            if(req.body.gru_per){
                const us= await UserModel.findAll({
                where:{gru_per:req.body.gru_per}
            })
            res.send({user:us})}
    
    
            
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
                        const per = await UserModel.findAll({
                                where: { username: username },attributes: ['id_per']
                            });
                        const id_per=per[0].id_per
                        const newTien = new TienesModel({id_per});
                        await newTien.save()
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
                const{username, passe, rol, nom_per, ced_per, gru_per,id_per,id_tec,id_tor,id_mou,id_dia,id_pan}= req.body
                if(passe!=""){
                        const saltRounds = 10;
                        const pass = await bcrypt.hash(passe, saltRounds)
                        await UserModel.update({username,pass,rol,nom_per,ced_per,gru_per}, {
                                where: { id_per: id_per}
                        })
                        await TienesModel.update({id_tec,id_tor,id_mou,id_dia,id_pan},{
                                where:{id_per: id_per}
                        })
                }else{                     
                        await UserModel.update(req.body, {
                        where: { id_per: req.params.id_per }
                        
                })
                const valor=await TienesModel.update({id_tec,id_tor,id_mou,id_dia,id_pan},{
                        where:{id_per: id_per}
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