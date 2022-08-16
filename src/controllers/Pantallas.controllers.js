import PantallaModel from "../models/Pantallas";

export const createPantalla = async (req, res) => {
    try {
        const { eti_pan, mar_pan, per_pan } = req.body;
        const pan = await PantallaModel.findOne({ where: { eti_pan: eti_pan } });
        if (!pan) {
            const newPant = new PantallaModel({ eti_pan, mar_pan, per_pan });
            const pantSaved = await newPant.save()
            res.status(201).json(pantSaved)
        } else {
            res.status(400).json("Ya hay otra torre con esa etiqueta!")
        }
    } catch (error) {
        console.log(error)
    }
}

export const getPantalla = async (req, res) => {
    try {
        const pant = await PantallaModel.findAll()
        res.send({pantalla:pant})
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const getPantallaById = async (req, res) => {
    try {
        const pant = await PantallaModel.findAll({
            where: { id_pan: req.params.id_pan }
        });
        res.status(200).json(pant[0])
    } catch (error) {
        res.json({ message: error.message })
    }

}

export const updatePantallaById = async (req, res) => {
    try {
        await PantallaModel.update(req.body, {
            where: { id_pan: req.params.id_pan }
        })
        res.status(200).json("success")
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const deletePantallaById = async (req, res) => {
    try {
        await PantallaModel.destroy({
            where: { id_pan: req.params.id_pan }
        })
        res.status(204)
    } catch (error) {
        res.json({ message: error.message })
    }

}