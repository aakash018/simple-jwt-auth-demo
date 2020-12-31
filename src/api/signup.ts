import express from "express"
import { pool } from "../psql_pool"
import bcrypt from "bcrypt"

const router = express()

interface USER_INFO {
    username: string,
    password: string,
    email: string
}

router.post("/", async (req) => {
    const { username, password, email }: USER_INFO = req.body
    const hasedPass = await bcrypt.hash(password, 12)
    await pool.query("INSERT INTO users (username, info, email) VALUES ($1, $2, $3)", 
                                        [username, hasedPass, email])
    const data = await pool.query("SELECT * FROM users")
    console.table(data.rows)

})

export default router