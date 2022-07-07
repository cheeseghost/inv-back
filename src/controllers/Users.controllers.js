const bcrypt = require("bcrypt")
const { CreateToken } = require("../middlewares/Token")
import UserModel from "../models/User"



export const loginUser = async (req, res) => {
        const { usernam, passe } = req.body
        const user = await UserModel.findOne({ where: { username: usernam } });
        const passwordCorrect = user == null
                ? false
                : await bcrypt.compare(passe, user.pass)
        if (!(passwordCorrect && user)) {
                res.status(404).json({ error: "contraseña o usuario invalido" })
        } else {
                const token = await CreateToken(user)
                res.send({
                        id_per:user.id_per,
                        username: user.username,
                        nom_per: user.nom_per,
                        token
                })
        }

}

export const createUser = async (req, res) => {
        const { username, passe, rol, nom_per, ced_per, gru_per } = req.body;
        const user = await UserModel.findOne({ where: { username: username } });
        if (!user) {
                const saltRounds = 10;
                const pass = await bcrypt.hash(passe, saltRounds)
                const newUser = new UserModel({ username, pass, rol, nom_per, ced_per, gru_per });
                const userSaved = await newUser.save()
                res.status(201).json(userSaved)
        } else {
                res.status(400).json("Ya hay otra cuenta con ese usario!")
        }
}

export const updateUser = async (req, res) => {
        try {
                await UserModel.update(req.body, {
                        where: { id_per: req.params.id_per }
                })
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