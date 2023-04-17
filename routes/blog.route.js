const express = require('express');
const { auth } = require('../middleware/auth.middleware ');
const { blogModel } = require('../models/blog.model');
const { authorisation } = require('../middleware/Authorisation');



const blogRouter = express.Router()

blogRouter.post("/add",authorisation(["seller"]),async(req,res)=>{
    // const payload = req.body
    // const role = req.role
    // console.log(role);
    if(authorisation){
        const payload = req.body
        const role = req.role
        console.log(role);
        // try {
            const products = new blogModel(payload)
            await products.save()
            res.status(200).send({msg:"new products is added"})
    
        // } catch (error) {
        //     res.status(400).send({msg:error.message})
        // }
    }else{
        res.send("you are not authorised")
    }

})

blogRouter.get("/",async(req,res)=>{

    try {
        const allPro = await blogModel.find()
        res.status(200).send(allPro)
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})

blogRouter.delete("/delete",authorisation(["Moderator"]),async(req,res)=>{
    const payload=req.body
    const role = req.role
    if(authorisation){
        try {
            const deletePro = await blogModel.findByIdAndDelete({_id:payload._id})
            res.status(200).send("produts is deleted")
        } catch (error) {
            res.status(400).send({msg:error.message})
        }
    }else{
        res.send("you are not authorised")
    }

})

blogRouter.patch("/update",async(req,res)=>{
    const payload=req.body
    try {
        const updateePro = await blogModel.findByIdAndUpdate({_id:payload._id},payload)
        res.status(200).send("produts is updated")
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})


module.exports={
    blogRouter
}