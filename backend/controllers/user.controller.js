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


export const getUsers= async(req, res, next) =>{
  if(!req.user.isAdmin){
      return next(errorHandler(403, 'you are not allowed to see user'))
  }
  try {
   const startIndex= parseInt(req.query.startIndex) || 0;
   const limit = parseInt(req.query.limit) || 9;
   const sortDirection = req.query.sort === 'asc' ?1 :-1;
   const users = await User.find()
   .sort({createdAt: sortDirection})
   .skip(startIndex)
   .limit(limit);

   const userWithoutPassword = users.map((user)=>{
    const {password, ...rest} = user._doc;
    return rest
   })
   const totalUser = await User.countDocuments();
   const now = new Date()
   const oneMonthAgo = new Date(
    now.getFullYear(),
    now.getMonth() -1,
    now.getDate()
   );
   const lastMonthUsers = await User.countDocuments({
    createdAt: {$gte:oneMonthAgo}
   })
    res.status(200).json({
      users:userWithoutPassword,
      totalUser,
      lastMonthUsers

    })
  } catch (error) {
    next(error)
  }
}

export const deleteUsers=async(req, res, next)=>{
   if(!req.user.isAdmin && req.user.id !== req.params.userid){
    return next(errorHandler(403, 'only admin can delete this post'))
   }
   try {
    await User.findByIdAndDelete(req.params.userid);
    res.status(200).json('The user has been deleted')
   } catch (error) {
    next(error)
   }
}


export const getUser = async(req, res, next)=>{
  const userId = req.params.userId;
  if (!userId) {
    return next(errorHandler(400, 'User ID is missing'));
  }

  try {
  
    const user = await User.findById(req.params.userId);
    if(!user){
      return next(errorHandler(404, 'user not found'))
    }
    const {passwrod, ...rest} = user._doc
    console.log(rest);
    res.status(200).json(rest)
  } catch (error) {
    next(error)
  
  }
}