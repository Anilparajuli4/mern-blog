import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { create, getposts } from '../controllers/post.controller.js'

const Router = express.Router()

Router.post('/create', verifyToken, create)
Router.get('/getposts', getposts)

export default Router