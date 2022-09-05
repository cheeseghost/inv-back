import MouseModel from "../models/Mouses"
import TienesModel from "../models/Tienes";

export const createMouse = async (req, res) => {
    try {
        const { eti_mou, mar_mou, per_mou } = req.body;
        const mou = await MouseModel.findOne({ where: { eti_mou: eti_mou } });
        if (!mou) {
            const newMouse = new MouseModel({ eti_mou, mar_mou, per_mou });
            const mouseSaved = await newMouse.save()
            res.status(201).json(mouseSaved)
        } else {
            res.status(400).json("Ya hay otra torre con esa etiqueta!")
        }
    } catch (error) {
        console.log(error)
    }
}

export const getMouse = async (req, res) => {
    try {
        const mou = await TienesModel.findAll({attributes: [],
            include:[{model:MouseModel,required: false,right: true}],required:false,left:true,where:{id_mou:null}
        })
        res.send({ mouse: mou })
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const filtMouses= async(req,res)=>{
    try {
        
        if(req.body.per_mou){
            const mou= await MouseModel.findAll({
            where:{per_mou:req.body.per_mou}
        })
        res.send({mouse:mou})}


        
    } catch (error) {   
        res.json({ message: error.message })
    }
}

export const allMouse= async(req,res)=>{
    try {
        const mou = await TienesModel.findAll({attributes: [],
            include:[{model:MouseModel,right:true}],
        })
        res.send({mouse:mou})
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const getMouseById = async (req, res) => {
    try {
        const mouse = await MouseModel.findAll({
            where: { id_mou: req.params.id_mou }
        });
        res.status(200).json(mouse[0])

    } catch (error) {
        res.json({ message: error.message })
    }

}

export const updateMouseById = async (req, res) => {
    try {
        await MouseModel.update(req.body, {
            where: { id_mou: req.params.id_mou }
        })
        res.status(200).json("success")
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const deleteMouseById = async (req, res) => {
    try {
        await MouseModel.destroy({
            where: { id_mou: req.params.id_mou }
        })
        res.status(204)
    } catch (error) {
        res.json({ message: error.message })
    }
}