import express from "express"
import { pool } from "../psql_pool"

const router = express()

interface USER_INFO {
    username: string,
    password: string,
    email: string
}

router.post("/", async (req) => {
    const { username, password, email }: USER_INFO = req.body
    await pool.query("INSERT INTO users (username, password, email) VALUES ($1, $2, $3)", 
                                        [username, password, email])
    const data = await pool.query("SELECT * FROM users")
    console.table(data.rows)

})

export default router