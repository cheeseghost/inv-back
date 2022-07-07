import TorreModel from "../models/Torres";

export const createTorre = async (req, res) => {
    const { eti_tor, per_tor, mar_tor, proc_tor, ram_tor, so_tor, ddtip_tor, ddcant_tor, dd_tor } = req.body;
    const tor = await TorreModel.findOne({ where: { eti_tor: eti_tor } });
    if (!tor) {
        const newTor = new TorreModel({ eti_tor, per_tor, mar_tor, proc_tor, ram_tor, so_tor, ddtip_tor, ddcant_tor, dd_tor });
        const torSaved = await newTor.save()
        res.status(201).json(torSaved)

    } else {
        res.status(400).json("Ya hay otra torre con esa etiqueta!")
    }

}

export const getTorre = async (req, res) => {
    try {
        const tor = await TorreModel.findAll()
        res.json(tor)
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const getTorreById = async (req, res) => {
    try {
        const tor = await TorreModel.findAll({
            where: { id_tor: req.params.id_tor }
        });
        res.status(200).json(tor[0])

    } catch (error) {
        res.json({ message: error.message })
    }
}

export const updateTorreById = async (req, res) => {
    try {
        await TorreModel.update(req.body, {
            where: { id_tor: req.params.id_tor }
        })
        res.status(200).json("success")
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const deleteTorreById = async (req, res) => {
    try {
        await TorreModel.destroy({
            where: { id_tor: req.params.id_tor }
        })
        res.status(204)
    } catch (error) {
        res.json({ message: error.message })
    }

}