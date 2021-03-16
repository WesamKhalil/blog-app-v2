const express = require("express")
const app = express()
const mongoose = require("mongoose")
const apiPostRoutes = require("./routes/api/post")
const apiUserRoutes = require("./routes/api/user")
require("dotenv").config()

//Connect to the MongoDB through their online application MongoDB Atlas
mongoose.connect(process.env.MONGOURL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
    .then(res => console.log("Connected to MongoDB."))

//Attach body data to the request variable in routes
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Setup folder for sending static files
app.use(express.static(__dirname + "/client/dist"))

//Api for CRUD operations on posts
app.use("/api/post", apiPostRoutes)

//Api for users logining in and out
app.use("/api/user", apiUserRoutes)

//Delivers the SPA
app.get(["/", "/new", "/edit/:id", "/login", "/register", "/view/:id"], (req, res) => {
    res.sendFile(__dirname + "/client/dist/index.html")
})

//Catches any request that doesn't exist and returns text
app.get("*", (req, res) => {
    res.send("doesn't exist.")
})

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Listening on port ${port}.`)
})