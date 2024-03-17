const express = require('express')
const router = express.Router();
const Orders = require('../Models/Orders');

router.post('/myOrderData', async (req, res) => {
    try {
            let userEmail = req.body.email;
            if(!userEmail){
                res.status(401).json({
                    success:false,
                    message:"No orders made, please order something"
                })
            }
            const response = await Orders.findOne({email:userEmail});
           
            res.status(200).json({
                orderData:response,
                success: true,
                message: "Orders for given user fetched successfully"
            });
        
        
        
    }

    catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Cannot fetch user's orders", error: error.message });

    }
});

module.exports = router 