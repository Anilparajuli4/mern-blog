import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { create, deletePost, getposts, updatepost } from '../controllers/post.controller.js'

const Router = express.Router()

Router.post('/create', verifyToken, create)
Router.get('/getposts', getposts)
Router.delete('/deletepost/:postId/:userId', verifyToken, deletePost)
Router.put('/updatepost/:postId/:userId', verifyToken, updatepost)

export default Router