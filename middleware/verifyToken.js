
const env=require('dotenv');
env.config({path:'./.env'});
const secret=process.env.SECRET

const jwt=require('jsonwebtoken')
const verifyToken=async(req,res,next)=>{
   try {
    const token=req.headers.authorization.split(' ')[1]
    console.log(token,"tok")
   
    
    if(!token){
        return res.status(400).json({
            message:'no token provided'
        })
    }
        jwt.verify(token,secret,function(err, decoded){
            if(err){
              return   console.log(err);
                 }
                 console.log(decoded);
                 res.json({
                    decoded
                 })
                 
          });

} catch (error) {
    console.log(error,"err");
    
}
}


module.exports=verifyToken