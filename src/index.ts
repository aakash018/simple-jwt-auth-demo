
import "dotenv/config"
import express from "express"
import signUp from "./api/signup"
import { pool } from "./psql_pool";


const app = express()
const PORT: number = 5000;

//Starting Page
    app.get("/", (_,res) => {
        res.json({status: "running", message: "Server is Running"})
    })


//PGSQL INIT
    const sqlDB =async() => {
        try {
        await pool.connect()
        console.log("Connected to DB")
        } catch(e) {
            console.error(e)
        }
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
