const express = require('express')
const router = express.Router();
const Orders = require('../Models/Orders');

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data; // order_data will be sent from frontend

    await data.splice(0, 0, { Order_date: req.body.order_date }); // storing the date seperately in 'Order_date' field

    let emailId = await Orders.findOne({ email: req.body.email })
    console.log("This is my email",emailId);
    try {


        if (emailId) {
            await Orders.findOneAndUpdate({ email: req.body.email }, {
                $push: { order_data: data }
            });
            res.status(200).json({
                success: true,
                message: "Order updated for already existing user"
            });
        } else {
            
            await Orders.create({
                email: req.body.email,
                order_data: [data]
            });
            res.status(200).json({ success: true, message: "Order created!" });
        }
    }

    catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });

    }
});

module.exports = router 