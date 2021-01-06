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

const validate: express.RequestHandler = (req, res, next) => {
    const header: string = req.headers.authorization as string
    if(!header){
        res.send("Not Auth")
    } else {
        const token = header.split(" ")[1]
        console.log("Error")
        jwt.verify(token, "key", (err, decoded) => {
            if(err){
                res.send("Not Auth")
                return console.log(" YOY " + err)
            } else {
                console.log(decoded)
                next()
            }
        })
    }
}


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
            const token =jwt.sign({uid: user.id}, 'key')
            res.json({token: token})
        } else {
            res.send("Wrong Password!")
        }
        
    } else {
        res.send("Error")
    }     

})

// ? JWT PRIVATE ROUTE TEST  
router.get("/data", validate, async (req, res) => {        
    const username: string = req.query.username as string
    const response = await User.findOne({username: username});
    if(response){
        const user:UserTypes = {
            username: response.username,
            password: response.password,
            email: response.email,
            id: response.id
        }
    res.send(user)
    }
})


export default router;