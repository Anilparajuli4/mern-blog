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

export const getPostComments = async(req, res, next)=>{
  try {
      const comments = await Comment.find({postId:req.params.postId}).sort({
        crearedAt: -1,
      })
      res.status(200).json(comments)
  } catch (error) {
      next(error)
  }
}

export const likeComment = async(req, res, next) =>{
   try {
    const comment = await Comment.findById(req.param.commentId);
    if(!comment){
      return next(errorHandler(404, 'comment not found'))
    }
    const userIndex = comment.likes.indexof(req.user.id)
    if(userIndex === -1){
      comment.NumberOfLikes += 1
      comment.likes.push(req.user.id)
    }else{
      comment.NumberOfLikes -= 1
      comment.likes.splice(userIndex, 1)
    }
    await comment.save()
   } catch (error) {
     next(error)
   }
}

export const getcomments = async (req, res, next) => {
  if (!req.user.isAdmin)
    return next(errorHandler(403, 'You are not allowed to get all comments'));
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'desc' ? -1 : 1;
    const comments = await Comment.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const totalComments = await Comment.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthComments = await Comment.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({ comments, totalComments, lastMonthComments });
  } catch (error) {
    next(error);
  }
};