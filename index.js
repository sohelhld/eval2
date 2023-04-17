const express = require('express');
const { connections } = require('./db');
var cookieParser = require('cookie-parser');
const { userRouter } = require('./routes/user.route');
const { auth } = require('./middleware/auth.middleware ');
const { blogRouter } = require('./routes/blog.route');
require("dotenv").config()
const app= express()


app.use(express.json())
app.use(cookieParser())

app.use("/users",userRouter)
app.use(auth)
app.use("/blogs",blogRouter)


app.listen(process.env.port,async(req,res)=>{
    try {
        await connections
        console.log("db is connected");
    } catch (error) {
        console.log("db is not connected");
    }
    console.log("server is connected");
})