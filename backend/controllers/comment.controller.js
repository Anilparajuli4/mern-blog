import Comment from "../modal/comment.modal.js";
import { errorHandler } from "../utils/error.js"

export const createComment=async(req, res, next)=>{
  if(!req.body.content){
    return next(errorHandler(401, 'contents is required'))
  }
  try {
    const {content, postId, userId} = req.body;
    if(userId !== req.user.id){
      return next(errorHandler(403, 'you are not allowed to create the comment'))
    }
    const newComment = new Comment({
      content,
      postId,
      userId
    })
   await newComment.save()
    res.status(201).json(newComment)
  } catch (error) {
      next(error)
  }
}

export const getComments = async(req, res, next)=>{
  try {
      const comments = await Comment.find({postId:req.params.postId}).sort({
        crearedAt: -1,
      })
      res.status(200).json(comments)
  } catch (error) {
      next(error)
  }
}