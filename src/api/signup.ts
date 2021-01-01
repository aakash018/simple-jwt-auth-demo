import express from "express"
import {getConnection} from "typeorm"
import bcrypt from "bcrypt"
import { User } from "../entities/Users"
import {v4 as uuid} from "uuid"

const router = express()

interface USER_INFO {
    username: string,
    password: string,
    email: string
}

router.post("/", async (req, res) => {
    const { username, password, email }: USER_INFO = req.body
    const hasedPass = await bcrypt.hash(password, 12)
    console.log(username)
    try {
    const result = await getConnection()
                    .createQueryBuilder()
                    .insert()
                        .into(User)
                        .values({
                            id: uuid(),
                            username: username,
                            password: hasedPass,
                            email: email,
                        })
                        .execute();
    console.log(result.raw)
        } catch(e) {
            console.error(e)
            if  (e.code === '23505') {
                res.json({
                    status: "error",
                    message: "User already Exists..."
                })
            }
        } 

})

export default router