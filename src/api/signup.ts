import express from "express"
import {getConnection} from "typeorm"
import bcrypt from "bcrypt"
import { User } from "../entities/Users"

const router = express()

interface USER_INFO {
    username: string,
    password: string,
    email: string
}

router.post("/", async (req) => {
    const { username, password, email }: USER_INFO = req.body
    const hasedPass = await bcrypt.hash(password, 12)
    console.log(username)
    const result = await getConnection()
                    .createQueryBuilder()
                    .insert()
                        .into(User)
                        .values({
                            username: username,
                            password: hasedPass,
                            email: email,
                        })
                        .execute();
    console.log(result.raw)

})

export default router