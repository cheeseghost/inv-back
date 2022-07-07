import MouseModel from "../models/Mouses"

export const createMouse = async (req, res) => {
    const { eti_mou, mar_mou, per_mou } = req.body;
    const mou = await MouseModel.findOne({ where: { eti_mou: eti_mou } });
    if (!mou) {
        const newMouse = new MouseModel({ eti_mou, mar_mou, per_mou });
        const mouseSaved = await newMouse.save()
        res.status(201).json(mouseSaved)
    } else {
        res.status(400).json("Ya hay otra torre con esa etiqueta!")
    }
}

export const getMouse = async (req, res) => {
    try {
        const mouse = await MouseModel.findAll()
        res.json(mouse)
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