const express=require('express');
const app=express()
const userRouter=require('./routes/route')
app.use(express.json())

app.use('/api/',userRouter)





module.exports=app   