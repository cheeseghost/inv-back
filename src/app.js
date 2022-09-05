import express from "express"
import morgan from "morgan"
import pkg from "../package.json"
import port from "./config"
import handdlErrors from "./middlewares/handdlErrors"
import mouseRoutes from "./routes/mouses.routes"
import pantallaRoutes from "./routes/pantallas.routes"
import tecladoRoutes from "./routes/teclados.routes"
import torreRoutes from "./routes/torres.routes"
import userRoutes from "./routes/users.routes"
import diademaRoutes from "./routes/diademas.routes"
import tienesRouter from "./routes/tienes.routes"
import DS from "./database/sesionbase"


const app = express()
const cors = require("cors");
const bodyParse = require('body-parser');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mysqlS=require("express-mysql-session");
 const sessionS= new mysqlS(DS)


app.use(cors({

    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(cookieParser(process.env.SEC))

app.use(bodyParse.urlencoded({ extended: true }))

app.use(session({
    key: "userId",
    store:sessionS,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60*60*4*1000,
    },
}));

app.set("pkg", pkg);

// app.use(handdlErrors)

app.use(morgan("dev"));

app.use(express.json())

app.get("/", (req, res) => {
    res.json({
        name: app.get("pkg").name,
        author: app.get("pkg").author,
        description: app.get("pkg").description,
        version: app.get("pkg").version

    })
})

app.set("port", port)

app.use("/mouses", mouseRoutes)

app.use("/users", userRoutes)

app.use("/diademas",diademaRoutes)

app.use("/tien",tienesRouter)

app.use("/pantallas", pantallaRoutes)

app.use("/teclados", tecladoRoutes)

app.use("/torres", torreRoutes)

export default app;