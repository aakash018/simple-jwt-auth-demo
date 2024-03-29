import { UserTypes } from "src/@types/user"
import { User } from "../entities/Users"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import express from "express"
import { validate } from "../config/jwt_validation"
import { setCurrentUser } from "../variables"



const router = express()



// ? JWT EXPIRIRING TOKEN
const expiringTime: number = 120;

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

        if(await bcrypt.compare(password, user.password as string)){
            const token =jwt.sign({uid: user.id}, 'key', { expiresIn: expiringTime })
            // ? TO SEND REFRESH COOKIE
            res.cookie('refresh-token', (jwt.sign({username: user.username}, 'refKey')), {
                httpOnly: true,
                maxAge: 100 * 60 * 60 * 12 * 24 * 10 // 10 days
            })
            setCurrentUser(user)
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
                setCurrentUser({
                    username: response.username,
                    email: response.email,
                    id: response.id
                })
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