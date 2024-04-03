import express from 'express'
import { Test, getUsers, signout, updateUser } from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router()

router.get('/test', Test)
router.put('/update/:userId',verifyToken, updateUser)
router.post('/signout', signout)
router.get('/getusers', verifyToken, getUsers)
 
export default router  