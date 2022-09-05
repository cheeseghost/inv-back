import db from "../database/database"
import { DataTypes } from "sequelize";
import PantallaModel from "./Pantallas";
import MouseModel from "./Mouses";
import TecladoModel from "./Teclados";
import TorreModel from "./Torres";
import UserModel from "./User";
import DiademaModel from "./Diademas";

const TienesModel = db.define("tienes", {
    id_per: { type: DataTypes.NUMBER, primaryKey: true, references: { model: UserModel, primaryKey: "id_per" } },
    id_pan: { type: DataTypes.NUMBER, references: { model: PantallaModel, key: "id_pan" } },
    id_mou: { type: DataTypes.NUMBER, references: { model: MouseModel, key: "id_mou" } },
    id_tec: { type: DataTypes.NUMBER, references: { model: TecladoModel, key: "id_tec" } },
    id_tor: { type: DataTypes.NUMBER, references: { model: TorreModel, key: "id_tor" } },
    id_dia: { type: DataTypes.NUMBER, references: { model: DiademaModel, key: "id_dia" } }

})
UserModel.hasOne(TienesModel, {
    foreignKey: "id_per"
});
TienesModel.belongsTo(UserModel, {
    foreignKey: "id_per"
});
PantallaModel.hasOne(TienesModel, {
    foreignKey: "id_pan"
});
TienesModel.belongsTo(PantallaModel, {
    foreignKey: "id_pan"
});
MouseModel.hasOne(TienesModel, {
    foreignKey: "id_mou"
});
TienesModel.belongsTo(MouseModel, {
    foreignKey: "id_mou"
});
TecladoModel.hasOne(TienesModel, {
    foreignKey: "id_tec"
});
TienesModel.belongsTo(TecladoModel, {
    foreignKey: "id_tec"
});
TorreModel.hasOne(TienesModel, {
    foreignKey: "id_tor"
});
TienesModel.belongsTo(TorreModel, {
    foreignKey: "id_tor"
});
DiademaModel.hasOne(TienesModel, {
    foreignKey: "id_dia"
});
TienesModel.belongsTo(DiademaModel, {
    foreignKey: "id_dia"
});

export default TienesModel