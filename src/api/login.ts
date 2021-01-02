import passport from "passport"
import { UserTypes } from "src/@types/user"
import { initializePassport } from "../config/passport"
import { User } from "../entities/Users"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import express from "express"

const router = express()

initializePassport(
    (username) => User.findOne({username: username}) as unknown as UserTypes,
    (id) => User.findOne(id)
)
router.post("/",  passport.authenticate("local") ,(req,res) => {
    res.send(req.user)
})



// * * JWT TEST

router.post("/jwt", async (req, res) => {
    const {username, password} = req.body
    const response = await User.findOne({username: username});
    if(response){
        const user:UserTypes = {
            username: response.username,
            password: response.password,
            email: response.email,
            id: response.id
        }

        if(await bcrypt.compare(password, user.password)){
            const token =jwt.sign({user}, 'key')
            res.cookie('uid', token, {httpOnly: true, sameSite: true})
            res.json(token)
        } else {
            res.send("Wrong Password!")
        }
        
    } else {
        res.sendStatus(403)
    }   

// ? JWT PRIVATE ROUTE TEST  
// router.get("/post-test", (req, _res) => {
//     const token = req.headers.cookie!.split(";")[1].split('=')[1].trim()
//     console.log(token)
//     jwt.verify(token, "key", (err, decoded) => {
//         if(err){
//             return console.error(err)
//         } else {
//             console.log(decoded)
//         }
//     })
// })
    

})

export default router;