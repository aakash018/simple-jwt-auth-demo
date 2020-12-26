import express from "express"

const app = express()
const PORT: number = 5000

const name: string = "Hi"

app.get("/get", (_,res) => {
    res.send(name)
})

app.listen(PORT, () => {
    console.log("Server Started")
})