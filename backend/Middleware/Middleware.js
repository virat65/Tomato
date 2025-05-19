import jwt from 'jsonwebtoken'
import userModel from '../Schema/userSchema.js';

export const middleWare = async(req,res,next)=>{
    const token = req.headers.authorization;
    console.log(token);

    const tokenSplit = token.split(" ")[1];
    console.log(tokenSplit);
    
    const decodeId =  jwt.verify(tokenSplit,process.env.secretkey)
    console.log(decodeId,"decodeid");

    const finddetails = await userModel.findById({_id: decodeId.id});
    console.log(finddetails,"finddetails");

    if(finddetails.token != tokenSplit){
        return res.json({
            sucess:false,
            status:400,
            message:'login again',
            body:{}
        });

    }else{
        req.user = finddetails;
        console.log(req.user);

        next();     
    }
};