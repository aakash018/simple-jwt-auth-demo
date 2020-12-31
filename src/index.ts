
import "dotenv/config"
import express from "express"
import signUp from "./api/signup"
// import { pool } from "./psql_pool";

import { MikroORM, QueryOrder } from "@mikro-orm/core"
import {Post} from "./entities/Post"
import microORM_config from "./mikro-orm.config"


const app = express()
const PORT: number = 5000;

//Starting Page
    app.get("/", (_,res) => {
        res.json({status: "running", message: "Server is Running"})
    })


//PGSQL INIT
    const orm_INIT = async () => {  
        const orm = await MikroORM.init(microORM_config)
        await orm.getMigrator().up();
        // const post = orm.em.create(Post, {title: 'YoHE'});
        // await orm.em.persistAndFlush(post)

        const PostRepo = orm.em.getRepository(Post)

        const postoutput  = await PostRepo.find({title: /%/}, {
           limit: 10,
           orderBy: {title: 'DESC'}
        })
        console.table(postoutput)
    }
    orm_INIT();

//Parser MiddleWare
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

//Routers
app.use("/api/signup", signUp)


//Server INI
app.listen(PORT, () => {
        console.log(`Server Running at ${PORT}`)
    })
