import express from "express"

const router = express()

router.post("/", (req,res) => {
    console.log(req.body)
    res.send("Done")
})

export default router