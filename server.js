const express = require("express")
const app = express()
const mongoose = require("mongoose")
const apiBlogRoutes = require("./routes/api/blog")
const apiUserRoutes = require("./routes/api/user")
require("dotenv").config()

//Connect to the MongoDB through their online application MongoDB Atlas
mongoose.connect(process.env.MONGOURL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
    .then(res => console.log("Connected to MongoDB."))

//Api for CRUD operations on posts
app.use("/api/blog", apiBlogRoutes)

//Api for users logining in and out
app.use("/api/user", apiUserRoutes)

app.get("/", (req, res) => {
    res.send("Working")
})

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Listening on port ${port}.`)
})