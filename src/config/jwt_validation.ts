import express from "express"
import jwt from "jsonwebtoken"


export const validate: express.RequestHandler = (req, res, next) => {
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
