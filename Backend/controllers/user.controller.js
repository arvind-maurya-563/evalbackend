const express = require("express");
const User = require("../models/user.model.js");
// const Blog = require("../models/blog.model.js");
const { signin } = require("../Jwttockens/jwt.js");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const data = req.body;
  try {
    const newUser = await User.create(data);
    const token = signin(newUser.toJSON())
    res.send({
      token,
    });
  } catch (error){
    res.status(500).send({
      status: 'error',
      Response:"some internal error accoured"
    })
  }
});
userRouter.post("/loginuser", async(req, res)=>{
  try {
      if (req.user){ 
          return res.send({
              status: 'success',
              message: 'User is verified and can go to dashboard',
              data: req.user,
          })
      }else{
          return res.status(400).send({
              status: 'error',
              message: 'User is not logged in.',
          })
      }
  } catch(err){
      return res.status(500).send({
          status: 'error',
          message: 'Unexpected error occured.',
      })
  }
  
});
userRouter.post('/login',async(req,res)=>{
        try {
          let {email,password} = req.body
          let user = await User.findOne({email})
          if(user){
             if(user.password===password){
              const token = signin(user.toJSON());
              res.send({
                status: 'success',
                token,
              });
             }
             else{
              res.status(400).send({
                status: 'error',
                res:"password Does nott Matched"
              })
             }
          }else{
            res.status(400).send({
              status: 'error',
              res:"user not found"
            })
          }
        } catch (error) {
          res.status(400).send({
            status: 'error',
            res:"somthing went wrong"
          })
        }
})

module.exports = userRouter;
