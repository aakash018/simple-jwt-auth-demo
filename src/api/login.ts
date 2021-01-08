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

// ? JWT EXPIRIRING TOKEN
const expiringTime: number = 60;

// * * JWT TEST

const validate: express.RequestHandler = (req, res, next) => {
    const header: string = req.headers.authorization as string
    if(!header){
        res.send("Not Auth")
    } else {
        const token = header.split(" ")[1]
        jwt.verify(token, "key", (err, decoded) => {
            if(err){
                res.send("Not Auth")
                return console.log("Validate Err " + err)
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
            const token =jwt.sign({uid: user.id}, 'key', { expiresIn: expiringTime })
            // ? TO SEND REFRESH COOKIE
            res.cookie('refresh-token', (jwt.sign({username: user.username}, 'refKey')), {
                httpOnly: true,
                maxAge: 100 * 60 * 60 * 12 * 24 * 10 // 10 days
            })
            // ? TO SEND ACTUAL TOKEN
            res.json({token: token, expiringTime: expiringTime})
        } else {
            res.send("Wrong Password!")
        }
        
    } else {
        res.send("Error")
    }     

})

// * Refresh Token 

router.get("/refresh-token", (req, res) => {
    const token = req.headers.cookie

    if(token?.split("=")[0] === "refresh-token"){
        jwt.verify(token?.split("=")[1], "refKey", async (err, decode) => {
            if(err) {
                return console.error(err)
            }
            const { username } = decode as {username: string, iat: number}
            const response = await User.findOne({username: username});

            if(response){
                const new_token = jwt.sign({uid: response.id}, 'key', { expiresIn: expiringTime })
                res.json({
                    token: new_token,
                    expiringTime: expiringTime, 
                    username: response.username,
                    email: response.email,
                    id: response.id
                })
            }
        })
    } else {
        res.status(403).json({message: "Not Auth"})
        console.log("No Token Found")
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

// ! JWT TEST DATA 

router.get("/test-data", validate, (_, res) => {
    console.log("Hello")
    res.send("You got data")
})


export default router;