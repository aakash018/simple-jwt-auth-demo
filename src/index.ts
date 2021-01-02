import "reflect-metadata"
import "dotenv/config"
import express from "express"
import signUp from "./api/signup"
import login from "./api/login"
import sessions from "express-session"
import {createConnection } from "typeorm"

import { User } from "./entities/Users"
import { Post } from "./entities/Post"
import passport from "passport"


const app = express()
const PORT: number = 5000;

//Starting Page
    app.get("/", (_,res) => {
        res.json({status: "running", message: "Server is Running"})
    })

// Passport Init 
    app.use(sessions({
        secret: "caT",
        resave: false,
        saveUninitialized: false,
    }))
    app.use(passport.initialize());
    app.use(passport.session());


//PGSQL INIT
    const typeORM = async () => {
        try{
            await createConnection({
                type: 'postgres',
                url: process.env.PSQL_URI,
                entities: [Post, User],
                synchronize: true,
            })
        console.log("Connected to DB");
        const result = await User.findOne({username: 'Mike'})
        console.log(result)
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


//Server INI
app.listen(PORT, () => {
        console.log(`Server Running at ${PORT}`)
    })
