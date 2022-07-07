const Sequelize = require("sequelize");
require("dotenv").config()






const HT = process.env.HOST
const US = process.env.USER
const PS = process.env.PASSWORD
const DB = process.env.DATABASE

const db = new Sequelize(DB, US, PS, {

   host: HT,
   dialect: "mysql"
});




export default db