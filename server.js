const app=require('./app')
const http=require('http')
const env=require('dotenv');
env.config({path:'./.env'});
const mongoose=require('mongoose')
const port=process.env.PORT
const server=http.createServer(app)

mongoose.connect('mongodb://127.0.0.1:27017/testDB')
.then(()=>console.log('db connected'))
.catch((err)=>console.log(err))



server.listen(port,()=>{
console.log(`server is running on ${port}`);    
})