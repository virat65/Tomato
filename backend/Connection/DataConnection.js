import mongoose from "mongoose";

const dataConnection = async()=>{
    try {
         await  mongoose.connect(process.env.Database)
        console.log("Server is Connected");
        
        
    } catch (error) {
        console.log(error,"Error in Connection");
        
        
    }
}
export default dataConnection;