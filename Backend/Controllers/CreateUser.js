const User=require('../Models/User')
const bcrypt=require('bcrypt')

exports.CreateUser=async(req,res)=>{
    try{
        
        // console.log(req.body);
        const {name,location,email,password}=req.body;
        
        bcrypt.hash(password,10,async(err,hash)=>{

            const result=await User.create({
                name:name,
                location:location,
                email:email,    
                password:hash,
                date:Date.now()            
            })
            console.log(result)
            res.status(200).json({
                success:true,
                result,
                message:"User created successfully"
            })
        });
    }
    catch(err)
    {
        console.log(err.message)
        res.status(401).json({
            success:false,
            message:"Error while creating user"
        })
    }
}