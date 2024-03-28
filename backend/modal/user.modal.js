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
    profilepicture:{
        type:String,
        default:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fblank-profile-picture&psig=AOvVaw26mLA-A2BcS_XQQsGy6ho0&ust=1711170192304000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJijxu2Lh4UDFQAAAAAdAAAAABAE'
    },
    isAdmin:{
        type:Boolean,
        default: false,
    },
}, {timestamps: true}
)

const User = mongoose.model('User', userSchema)

export default User