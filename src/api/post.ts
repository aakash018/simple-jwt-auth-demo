import express from "express"
import { IPost } from "src/@types/post"
import { validate } from "../config/jwt_validation"
import { getConnection } from "typeorm"
import { Post } from "../entities/Post"
import { getCuurentUser } from "../variables"




const router = express()

router.get("/", async (_, res) => {
    const post = await Post.find()
    res.send(post)
})

router.get("/my_post", validate ,async (req, res) => {
    const name = req.query.name

    if(name !== getCuurentUser().username){
        return res.send("User Dont Have Permission")
    }

    const result = await getConnection()
                        .getRepository(Post)
                        .createQueryBuilder("p")
                        .innerJoinAndSelect(
                            "p.creator",
                            "u",
                            'u.id = p."creatorId"'
                        )
                        .select(['u.username', 'p.id', 'p.title', 'p.body', 'u.email'])
                        .where("u.username = :username", { username: name })
                        .getMany()
    if(result === null) {
        return res.json({ message: "No Data Found" })
    }
    return res.send(result)
})

router.post("/", async (req,res) => {
    const input = req.body as IPost
    const result = await Post.create(input).save()  
   
    res.send(result)
})

export default router