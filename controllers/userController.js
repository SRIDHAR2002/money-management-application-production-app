const userModel=require('../models/userModel')

const loginController=async (req,res)=>{
     try{
        const {email,password}=req.body;
        const user=await userModel.findOne({email,password});
        if(!user){
            return res.status(404).send('user not found')
        }
        res.status(200).json({
            success:true,
            user
        })
     }catch(err){
        res.status(400).json({
            success:false,
            err
        })
     }
}


const registerController= async (req,res)=>{
    try{
        const newUser=new userModel(req.body);
        await newUser.save();
        res.status(201).json({
            success:true,
            newUser
        })
    }catch(err){
        res.status(400).json({
            success:false,
            err
        })
    }
}
module.exports={loginController,registerController}