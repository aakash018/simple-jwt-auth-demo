import "reflect-metadata"
import "dotenv/config"

import express from "express"
import signUp from "./api/signup"
import login from "./api/login"
import post from "./api/post";


import {createConnection } from "typeorm"
import { User } from "./entities/Users"
import { Post } from "./entities/Post"



const app = express()
const PORT: number = 5000;

//Parser INIT
app.use(express.json())
app.use(express.urlencoded({ extended: false }));


//Starting Page
    app.get("/", (_,res) => {
        res.json({status: "running", message: "Server is Running"})
    })


//PGSQL INIT
    const typeORM = async () => {
        try{
            // console.log(EUsers)
            await createConnection({
                type: 'postgres',
                url: process.env.PSQL_URI,
                logging: true,
                entities: [User, Post],
                synchronize: true,
            })

            // await Post.delete({})
            // await User.delete({})

        console.log("Connected to DB");
        } catch(e) {
            console.error(e)
        }
    }
    typeORM()

//Parser MiddleWare
app.use(express.json())
app.use(express.urlencoded({ extended: false }));



app.use("/api/signup", signUp)
app.use("/api/login", login)
app.use("/api/post", post)


//Server INI
app.listen(PORT, () => {
        console.log(`Server Running at ${PORT}`)
    })
