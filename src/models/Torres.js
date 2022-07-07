import db from "../database/database"
import { DataTypes } from "sequelize";

const TorreModel = db.define("torres", {
    id_tor: { type: DataTypes.NUMBER, primaryKey: true },
    eti_tor: { type: DataTypes.STRING, allowNull: false, },
    per_tor: { type: DataTypes.ENUM("zinko", "alliance", "milenium"), allowNull: false, },
    mar_tor: { type: DataTypes.STRING, allowNull: false, },
    proc_tor: { type: DataTypes.STRING, allowNull: false, },
    ram_tor: { type: DataTypes.TINYINT, allowNull: false, },
    so_tor: { type: DataTypes.STRING, allowNull: false, },
    ddtip_tor: { type: DataTypes.ENUM("HDD", "SSD"), allowNull: false, },
    ddcant_tor: { type: DataTypes.NUMBER, allowNull: false, },
    dd_tor: { type: DataTypes.ENUM("GB", "TB"), allowNull: false, }

})

export default TorreModel