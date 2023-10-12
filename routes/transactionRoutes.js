const express=require('express');
const { addTrasansaction, getAllTrasactions ,editTrasansaction,deleteTrasansaction} = require('../controllers/userTransactionControl');

const router=express.Router();


router.post('/add-transaction',addTrasansaction);
router.post('/edit-transaction',editTrasansaction);
router.post('/delete-transaction',deleteTrasansaction);

router.post('/get-transaction',getAllTrasactions)
module.exports=router;