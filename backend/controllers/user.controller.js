import { errorHandler } from "../utils/error.js"
import bcryptjs from "bcryptjs"
import User from "../modal/user.modal.js"
export const Test = (req, res)=>{
  res.json('api is working')
}

export const updateUser = async(req, res, next)=>{
  if(req.user.id !== req.params.userId){
    return next(errorHandler(403, 'you are not allowed to update the user'))
  }
  if(req.body.password){
    if(req.body.password.length <6){
      return next(errorHandler(400, 'Password must be at least 6 character'))
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10)
  }
 if(req.body.username ){
  if(req.body.username.length < 7 || req.body.username.length > 20){
    return next(errorHandler(400, 'Username must be between 7 and 20 character'))
  }
  if(req.body.username.includes(' ')){
    return next(errorHandler(400, 'Username cannot contain spaces'))
  }
  if(req.body.username !== req.body.username.toLowerCase()){
    return next(errorHandler(400, 'Username must be lowercase'))
  }
  if(req.body.username.match(/^[a-zA-Z0-9] +$/)){
    return next(errorHandler(400, 'Username can only contains letter and numbers'))
  }
  try {
     const updateUser = await User.findByIdAndUpdate(req.params.userId, {
      $set:{
        username: req.body.username,
        email: req.body.email,
        profilepicture: req.body.profilepicture,
        password: req.body.password,
      },
     }, {new: true});
     const {password, ...rest} = updateUser._doc
     res.status(200).json(rest)
  } catch (error) {
    next(error)
  }
 }
}

export const signout =async(req, res, next) =>{
try {
  res.clearCookie('access_token').status(200).json('User has been signed out')
} catch (error) {
  next(error)
}
}