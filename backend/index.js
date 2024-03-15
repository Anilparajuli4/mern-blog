import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/user.routes.js'
dotenv.config()
const app = express()
mongoose.connect(process.env.MONGO).then(()=>console.log('database is connected')).catch((err)=>console.log('error', err))

app.listen(3000, ()=>{
    console.log('server is running');
})

app.use('/api/user', userRouter)
