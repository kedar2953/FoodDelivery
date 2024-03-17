const express=require('express');

const router=express.Router();

router.post('/foodData',(req,res)=>{
    try{
        console.log(global.foodCategory);
        res.send([global.food_items,global.foodCategory]);
        res.status(200).json({
            succss:true,
            message:"Data displayed successfully"
        })
    }
    catch(err){
        console.error(err.message);
        res.status(401).json({
            succss:false,
            message:"Data displayed unsuccessfully"
        })
    }
})
module.exports = router