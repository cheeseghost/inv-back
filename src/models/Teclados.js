import db from "../database/database"
import { DataTypes } from "sequelize";

const TecladoModel = db.define("teclados", {
    id_tec: { type: DataTypes.NUMBER, primaryKey: true },
    eti_tec: { type: DataTypes.STRING, allowNull: false, },
    mar_tec: { type: DataTypes.STRING, allowNull: false, },
    per_tec: { type: DataTypes.ENUM("zinko", "alliance", "milenium"), allowNull: false, }
})

export default TecladoModel