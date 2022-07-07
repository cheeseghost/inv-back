import db from "../database/database"
import { DataTypes } from "sequelize";

const MouseModel = db.define("mouses", {
    id_mou: { type: DataTypes.NUMBER, primaryKey: true },
    eti_mou: { type: DataTypes.STRING, allowNull: false, },
    mar_mou: { type: DataTypes.STRING, allowNull: false, },
    per_mou: { type: DataTypes.ENUM("zinko", "alliance", "milenium"), allowNull: false, }
})

export default MouseModel