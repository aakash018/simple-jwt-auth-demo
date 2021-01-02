import passport from "passport"
import { UserTypes } from "src/@types/user"
import { initializePassport } from "../config/passport"
import { User } from "../entities/Users"

import express from "express"

const router = express()

initializePassport(
    (username) => User.findOne({username: username}) as unknown as UserTypes,
    (id) => User.findOne(id)
)
router.post("/",  passport.authenticate("local") ,(req,res) => {
    console.log("Aurh") 
    res.send(req.user)
}) 

export default router;