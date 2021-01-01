import "reflect-metadata"
import "dotenv/config"
import express from "express"
import signUp from "./api/signup"
// import { MikroORM } from "@mikro-orm/core"
// import {Post} from "./entities/Post"
// import { User } from "./entities/Users"
// import microORM_config from "./mikro-orm.config"
// import {typeorm} from "./orm"
import {createConnection} from "typeorm"

import { User } from "./entities/Users"
import { Post } from "./entities/Post"

const app = express()
const PORT: number = 5000;

//Starting Page
    app.get("/", (_,res) => {
        res.json({status: "running", message: "Server is Running"})
    })


//PGSQL INIT
    const typeORM = async () => {
        try{
            const typeorm = await createConnection({
                type: 'postgres',
                url: process.env.PSQL_URI,
                entities: [Post, User],
                synchronize: true,
            })
        console.log("Connected to DB");
        const result = await typeorm.createQueryBuilder()
                                    .select("*")
                                    .from(User, "*")
                                    .getMany()
        console.log(result)
        } catch(e) {
            console.error(e)
        }
    }
    typeORM()

//Parser MiddleWare
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

//Routers
app.use("/api/signup", signUp)


//Server INI
app.listen(PORT, () => {
        console.log(`Server Running at ${PORT}`)
    })
