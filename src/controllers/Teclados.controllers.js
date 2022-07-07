import TecladoModel from "../models/Teclados";

export const createTeclado = async (req, res) => {
    const { eti_tec, mar_tec, per_tec } = req.body;
    const tec = await TecladoModel.findOne({ where: { eti_tec: eti_tec } });
    if(!tec){
        const newTec = new TecladoModel({ eti_tec, mar_tec, per_tec });
        const tecSaved = await newTec.save()
        res.status(201).json(tecSaved)
    } else {
        res.status(400).json("Ya hay otra torre con esa etiqueta!")
    }
}

export const getTeclado = async (req, res) => {
    try {
        const tec = await TecladoModel.findAll()
        res.json(tec)
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const getTecladoById = async (req, res) => {
    try {
        const tec = await TecladoModel.findAll({
            where: { id_tec: req.params.id_tec }
        });
        res.status(200).json(tec[0])

    } catch (error) {
        res.json({ message: error.message })
    }
}

export const updateTecladoById = async (req, res) => {
    try {
        await TecladoModel.update(req.body, {
            where: { id_tec: req.params.id_tec }
        })
        res.status(200).json("success")
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const deleteTecladoById = async (req, res) => {
    try {
        await TecladoModel.destroy({
            where: { id_tec: req.params.id_tec }
        })
        res.status(204)
    } catch (error) {
        res.json({ message: error.message })
    }

}