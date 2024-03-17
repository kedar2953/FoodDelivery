const express=require('express')
const database = require('./utils/database')
const app=express()
const cors=require('cors')

app.use(express.json())
app.use(cors())
const router=require('./Routes/user')
require('dotenv').config()
const PORT = process.env.PORT
app.get('/',(req,res)=>{
    res.send("Welcome to home")
})
database();
app.use('/api/v1',router)
app.use('/api/v1',require("../Backend/Routes/displayData"))
app.use('/api/v1',require("../Backend/Routes/OrderData"))
app.use('/api/v1',require("./Routes/MyOrder"))

app.listen(5000,()=>{
    console.log(`server is running on port ${PORT}`)
})