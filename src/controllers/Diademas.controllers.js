import DiademaModel from "../models/Diademas";
import TienesModel from "../models/Tienes";

export const createDiadema = async (req, res) => {
    try {
        const { eti_dia, marc_dia} = req.body;
        const dia = await DiademaModel.findOne({ where: { eti_dia: eti_dia } });
        if (!dia) {
            const newDia = new DiademaModel({ eti_dia, marc_dia});
            const diaSaved = await newDia.save()
            res.status(201).json(diaSaved)
        } else {
            res.status(400).json("Ya hay otra torre con esa etiqueta!")
        }
    } catch (error) {
        console.log(error)
    }
}

export const getDiadema = async (req, res) => {
    try {
        const dia = await TienesModel.findAll({attributes: [],
            include:[{model:DiademaModel,required: false,right: true}],required:false,left:true,where:{id_dia:null}
        })
        res.send({ diadema: dia })
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const allDiadema= async(req,res)=>{
    try {
        const dia = await TienesModel.findAll({attributes: [],
            include:[{model:DiademaModel,right:true}],
        })
        res.send({diadema:dia})
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const getDiademaById = async (req, res) => {
    try {
        const dia = await DiademaModel.findAll({
            where: { id_dia: req.params.id_dia }
        });
        res.status(200).json(dia[0])
    } catch (error) {
        res.json({ message: error.message })
    }

}

export const updateDiademaById = async (req, res) => {
    try {
        await DiademaModel.update(req.body, {
            where: { id_dia: req.params.id_dia }
        })
        res.status(200).json("success")
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const deleteDiademaById = async (req, res) => {
    try {
        await DiademaModel.destroy({
            where: { id_dia: req.params.id_dia }
        })
        res.status(204)
    } catch (error) {
        res.json({ message: error.message })
    }

}