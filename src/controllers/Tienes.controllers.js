import DiademaModel from "../models/Diademas";
import MouseModel from "../models/Mouses";
import PantallaModel from "../models/Pantallas";
import TecladoModel from "../models/Teclados";
import TienesModel from "../models/Tienes";
import TorreModel from "../models/Torres";

export const getTienes = async (req, res) => {
    try {
        const pan = await TienesModel.findAll({ attributes:[],
            include:[{model:PantallaModel,right:true,required:false}],required:false,left:true,where:{id_pan:null}
        })
        const mou = await TienesModel.findAll({attributes: [],
            include:[{model:MouseModel,required: false,right: true}],required:false,left:true,where:{id_mou:null}
        })
        const dia = await TienesModel.findAll({attributes: [],
            include:[{model:DiademaModel,required: false,right: true}],required:false,left:true,where:{id_dia:null}
        })
        const tec = await TienesModel.findAll({attributes: [],
            include:[{model:TecladoModel,required: false,right: true}],required:false,left:true,where:{id_tec:null}
        })
        const tor = await TienesModel.findAll({attributes: [],
            include:[{model:TorreModel,required: false,right: true}],required:false,left:true,where:{id_tor:null}
        })
        res.send({pantallas:pan, mouses:mou, diademas:dia, teclados:tec, torres:tor})
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const createTiene = async (req, res) => {
    try {
        const { id_per } = req.body;
        const pan = await TienesModel.findOne({ where: { id_per: id_per } });
        if (!pan) {
            const newTien = new TienesModel({ id_per});
            const tienSaved = await newTien.save()
            res.status(201).json(tienSaved)
        } else {
            res.status(400).json("Ya hay otra torre con esa etiqueta!")
        }
    } catch (error) {
        console.log(error)
    }
}