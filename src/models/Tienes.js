import db from "../database/database"
import { DataTypes } from "sequelize";
import PantallaModel from "./Pantallas";
import MouseModel from "./Mouses";
import TecladoModel from "./Teclados";
import TorreModel from "./Torres";
import UserModel from "./User";

const TienesModel = db.define("tienes", {
    id_per: { type: DataTypes.NUMBER, primaryKey: true,references:{model:UserModel, key:id_per} },
    id_pan: { type:DataTypes.NUMBER,references:{model:PantallaModel, key:id_pan} },
    id_mou: { type:DataTypes.NUMBER,references:{model:MouseModel, key:id_mou} },
    id_tec: { type:DataTypes.NUMBER,references:{model:TecladoModel, key:id_tec} },
    id_tor: {type:DataTypes.NUMBER,references:{model:TorreModel, key:id_tortec} }
})

export default TienesModel