const express=require('express');
const verifyToken=require('../middleware/verifyToken')
const userRouter=express.Router();
const userController=require('../controller/userController')
userRouter.post("/registration",userController.registration)
userRouter.post("/login",userController.login)
userRouter.get("/verify",verifyToken)
userRouter.post("/refreshToken",userController.refreshToken)








module.exports=userRouter;  