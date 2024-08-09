const User=require('../model/user')
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')
const secret=process.env.SECRET
const UserToken=require('../model/userTokenSchema')
const registration=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
       
         if(!name || !email || !password){
          return   res.status(400).json({
                message:'failed',

            })
        }
        const uniqueUser=await User.find({email})
        if(!uniqueUser){
            const salt =await  bcrypt.genSaltSync(10);
            const hash =await  bcrypt.hashSync(password, salt);
        const user=new User({name,email,password:hash})
            const savedUser=await user.save()
            return res.status(200).json({
                message:'success',
                savedUser
            })
        }else{
            return res.status(400).json({
                message:'user already exist'
            })
        }
       

    } catch (error) {
        console.log(error);
        
    }

    
}

const login=async(req,res)=>{
try {
    const {email,password} =req.body;
    if(!email || !password){
        return   res.status(400).json({
            message:'failed data not found',
        })
    }
const user=await User.findOne({email});
const hash=await user.password;
const isValue=bcrypt.compareSync(password,hash)  
   if(!isValue){
   return res.status(200).json({
    message:'no username or password'
   })
   }
   const payload={name:user.name,email:user.email}
   const accessToken = jwt.sign(payload, secret, { expiresIn: '15m' }); // Short-lived
   const refreshToken = jwt.sign(payload, secret, { expiresIn: '7d' }); // Long-lived
    return res.status(200).json({
      message:'success',
      accessToken,
      refreshToken
    
   })
    
} catch (error) {
    console.log(error,"err");
    }
}

const refreshToken=async (req,res)=>{
    const refreshToken=req.headers.authorization.split(' ')[1]
    console.log(refreshToken,"refre");
    
    if(!refreshToken){
        res.status(403).json({
            message:"Access denied :no token provided"
        })
    }
 try {
        const {_id}=jwt.verify(
            refreshToken,
            process.env.SECRET
        );

        const userToken=await  UserToken.findOne({
            userId:_id,
            oken:refreshToken
        })

        if (!userToken) {
            return res.status(403).json({ message: "Invalid refresh token" });
          }

          const accessToken = jwt.sign({ _id }, process.env.ACCESS_TOKEN_SECRET_KEY, {
            expiresIn: "5m",
          });
          res.status(200).json({ accessToken });

    } catch (error) {
        console.log(error);
        
    }
    
}





module.exports={registration,login,refreshToken}


