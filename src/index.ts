
import "dotenv/config"
import express from "express"
import signUp from "./api/signup"
import {Pool} from "pg"

const app = express()
const PORT: number = 5000;

//Startinf Page
    app.get("/", (_,res) => {
        res.json({status: "running", message: "Server is Running"})
    })


//PGSQL INIT
    const sqlDB =async() => {
        const pool = new Pool({
            connectionString: process.env.PSQL_URI,
        })

        await pool.connect()
        console.log("Connected")
    }
    sqlDB()

//Parser MiddleWare
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

//Routers
app.use("/api/signup", signUp)


//Server INI
app.listen(PORT, () => {
        console.log(`Server Running at ${PORT}`)
    })
