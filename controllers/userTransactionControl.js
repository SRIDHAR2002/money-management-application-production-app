const transactionModel=require('../models/transactionModel')
const moment=require('moment')
const getAllTrasactions=async (req,res)=>{
    try {
        const {frequency,selectedDate,type}=req.body
        const transactions=await transactionModel.find({
            ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectedDate[0],
              $lte: selectedDate[1],
            },
          }),
            userid:req.body.userid,
                ...(type!=='all' && {type}),
            
        });
        res.status(200).json(transactions)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

const addTrasansaction=async (req,res)=>{
    try{
        const newTransaction=new transactionModel(req.body)
        await newTransaction.save();
        res.status(201).send('transaction created')
        
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}
const editTrasansaction=async (req,res)=>{
    try{
        await transactionModel.findOneAndUpdate(
            {_id:req.body.transacationId},
            req.body.payload)
            console.log(req.body.payload)
        res.status(200).send("edit success")
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}

const deleteTrasansaction=async (req,res)=>{
    try{
        await transactionModel.findOneAndDelete(
            {_id:req.body.transacationId})
            // console.log(req.body.payload)
        res.status(200).send("delete success")
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}
module.exports={getAllTrasactions,addTrasansaction,editTrasansaction,deleteTrasansaction}