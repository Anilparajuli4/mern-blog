import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        requred:true,
    }, 
}, {timestamps: true}
)

const User = mongoose.modelNames('User', userSchema)

export default User