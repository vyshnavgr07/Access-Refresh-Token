const mongoose=require('mongoose');

const tokenSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    token:{
        type:String,
        required:true,
},
createdAt:{
    type:Date,
    default:Date.now,
    expires:30*86400,
}
});

const userToken=mongoose.model('UserToken',tokenSchema)
module.exports=userToken;