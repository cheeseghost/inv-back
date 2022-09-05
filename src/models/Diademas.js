import db from "../database/database"
import { DataTypes } from "sequelize";

const DiademaModel = db.define("diademas", {
    id_dia: { type: DataTypes.NUMBER, primaryKey: true },
    eti_dia: { type: DataTypes.STRING, allowNull: false },
    marc_dia: { type: DataTypes.STRING, allowNull: false },
})

export default DiademaModel