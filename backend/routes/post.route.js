import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { create, deletePost, getposts } from '../controllers/post.controller.js'

const Router = express.Router()

Router.post('/create', verifyToken, create)
Router.get('/getposts', getposts)
Router.delete('/deletepost/:postId/:userId', verifyToken, deletePost)

export default Router