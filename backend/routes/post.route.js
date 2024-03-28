import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { create } from '../controllers/post.controller.js'

const Router = express.Router()

Router.post('/create', verifyToken, create)

export default Router