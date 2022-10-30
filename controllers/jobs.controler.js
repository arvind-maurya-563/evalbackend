const express = require("express");
const adminModel = require('../models/admin.model.js')
const { signin } = require("../Jwttockens/jwt.js");
const userModel = require("../models/user.model.js");
const adminRouter = express.Router();

adminRouter.post("/admin/Setjob/:id", async(req, res)=>{
  try {
        let id = req.params.id
        let body = req.body;
        let admin = await userModel.findById(id)
        
         body.admin = admin._id;
         let job = await adminModel.create(body)
         admin.Jobs = [...admin.Jobs,job._id];
         await admin.save();
       res.send({
        status:"success",
        data:admin
       })
  } catch(err){
      return res.status(500).send({
          status: 'error',
          message: 'Unexpected error occured.',
      })
  }
});
adminRouter.patch("/admin/Editjob/:id", async(req, res)=>{
  try {
        let id = req.params.id
        let body = req.body;
       await adminModel.findByIdAndUpdate(id,{...body})
       res.send({
        status:"success",
       })
  }catch(err){
      return res.status(500).send({
          status: 'error',
          message: 'Unexpected error occured.',
      })
  }
});
adminRouter.delete('/user/DeleteJob/:id/:userid',async(req,res)=>{
  try {
      let {id,userid} = req.params;
      let job = await adminModel.findById(id);
      let user = await userModel.findById(userid);
      let arr = user.Jobs;
      arr = arr.filter((el)=>{
        return !el.equals(job._id);
      })
      user.Jobs = arr;
      await adminModel.findByIdAndDelete(id);
      await user.save();
      res.send({
        status:"success"
      })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      status: 'error',
      message: 'Unexpected error occured.',
     })
  }
})
adminRouter.get("/admin/getAlljob", async(req, res)=>{
  try {
      let job = await adminModel.find()
  
       res.send({
        status:"success",
        data:job
       })
  } catch(err){
      return res.status(500).send({
          status: 'error',
          message: 'Unexpected error occured.',
      })
  }
});
adminRouter.delete('/user/DeleteJobfrom/:id/:userid',async(req,res)=>{
  try {
      let {id,userid} = req.params;
      let job = await adminModel.findById(id);
      let user = await userModel.findById(userid);
      let arr = user.Jobs;
      arr = arr.filter((el)=>{
        return !el.equals(job._id);
      })
      user.Jobs = arr;
      await user.save();
      res.send({
        status:"success"
      })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      status: 'error',
      message: 'Unexpected error occured.',
     })
  }
})
adminRouter.get("/admin/getjob/:id", async(req, res)=>{
  try {
       let id = req.params.id
        let admin = await userModel.findById(id)
       
      let job = await adminModel.find({admin:admin._id})
        
       res.send({
        status:"success",
        data:job
       })
  } catch(err){
      return res.status(500).send({
          status: 'error',
          message: 'Unexpected error occured.',
      })
  }
});
adminRouter.get("/user/getjob/:id", async(req, res)=>{
  try {
       let id = req.params.id
        let user = await userModel.findById(id)
       
      let alljobs = [];
      for(let i = 0; i<user.Jobs.length; i++){
            let myjob = await adminModel.findById(user.Jobs[i]);
            alljobs.push(myjob)
      }
        
       res.send({
        status:"success",
        data:alljobs
       })
  } catch(err){
      return res.status(500).send({
          status: 'error',
          message: 'Unexpected error occured.',
      })
  }
});
adminRouter.post("/user/getJob/:id/:jobid", async(req, res)=>{
  try {
        let {id,jobid} = req.params
        let user = await userModel.findById(id);
        let job = await adminModel.findById(jobid)
        user.Jobs = [...user.Jobs,job._id];
         await user.save();
       res.send({
        status:"success",
        data:user
       })
  } catch(err){
      return res.status(500).send({
          status: 'error',
          message: 'Unexpected error occured.',
      })
  }
});

module.exports = adminRouter;
