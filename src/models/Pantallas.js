import db from "../database/database"
import { DataTypes } from "sequelize";


const PantallaModel = db.define("pantallas", {
    id_pan: { type: DataTypes.NUMBER, primaryKey: true },
    eti_pan: { type: DataTypes.STRING, allowNull: false, },
    mar_pan: { type: DataTypes.STRING, allowNull: false, },
    per_pan: { type: DataTypes.ENUM("zinko", "alliance", "milenium"), allowNull: false, }

})

export default PantallaModel