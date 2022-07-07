import db from "../database/database"
import { DataTypes } from "sequelize";

const UserModel = db.define("personas", {
    id_per: { type: DataTypes.NUMBER, primaryKey: true },
    username: { type: DataTypes.STRING,allowNull: false,},
    pass: { type: DataTypes.STRING,allowNull: false, },
    rol: { type: DataTypes.ENUM("admin", "user"),allowNull: false, },
    nom_per: { type: DataTypes.STRING,allowNull: false, },
    ced_per: { type: DataTypes.BIGINT,allowNull: false, },
    gru_per: { type: DataTypes.ENUM("CS", "DM", "HR", "SAT", "SMM", "SOLAR", "BO"),allowNull: false, }

})

export default UserModel