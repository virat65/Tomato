import jwt from 'jsonwebtoken'
export const tokenGen = async(idd)=>{
    try {
        const tokenn = await jwt.sign({id:idd},process.env.secretkey);
        console.log(tokenn,"tokennnn");
        const verify = await jwt.verify(tokenn,process.env.secretkey);
        console.log(verify,"tokenverify");
        
        return{tokenn,verify}
        
    } catch (error) {
        console.log(error,"error in token");
               
    }
}