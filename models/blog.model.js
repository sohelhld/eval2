const mongoose = require('mongoose');


const blogSchema = mongoose.Schema({
    name:{type:String,require:true},
    admin:{type:String,require:true},
    page:{type:Number,require:true}
    // blog:{type:String,default:"customer",enum:["customer","seller","admin"]}

},{
    versionKey:false
})

const blogModel = mongoose.model("blog",blogSchema)

module.exports={
    blogModel
}