const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email:{type:String},
    pass:{type:String},
    role:{type:String,default:"User",enum:["User","Moderator"]}

})

const userModel = mongoose.model("user",userSchema)

module.exports={
    userModel
}