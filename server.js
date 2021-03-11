const express = require("express")
const app = express()
const apiBlogRoutes = require("./routes/api/blog")
require("dotenv").config()

app.use("/api/blog", apiBlogRoutes)

app.get("/", (req, res) => {
    res.send("Working")
})

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Listening on port ${port}.`)
})