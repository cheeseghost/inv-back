const session = require("express-session");
const mysqlS=require("express-mysql-session");
import DS from "../database/sesionbase"
const sessionS= new mysqlS(DS)

session({
    key: "userId",
    store:sessionS,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60*60*3*1000,
    },
})
