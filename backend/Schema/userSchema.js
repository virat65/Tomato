import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{type:String, default:""},
    email:{type:String, default:""},
    password:{type:String, default:""},
    phone:{type:Number, default:0},
    token:{type:String, default:""},
    loginTime:{type:String, default:""},
    image:{type:String,default:""},

},{timestamps:true});

const userModel = new mongoose.model('user', userSchema);

export default userModel;