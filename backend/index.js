import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/user.routes.js'
import authRoutes from './routes/auth.route.js'
import postRoutes from './routes/post.route.js'
import cookieParser from 'cookie-parser';
dotenv.config()
const app = express()

app.use(express.json())
app.use(cookieParser())
mongoose.connect(process.env.MONGO).then(()=>console.log('database is connected')).catch((err)=>console.log('error', err))

app.listen(3000, ()=>{
    console.log('server is running');
})

app.use('/api/user', userRouter)
app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)

app.use((err, req, res, next)=> {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal server error'
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})