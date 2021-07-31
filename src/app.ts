import express, { Application } from 'express'
import cors from 'cors'
import morgan from 'morgan'
//initialization
const app: Application = express()

import authRoutes from './routes/auth'

// setting
app.set('port', 4000)
//middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
//routes
app.use('/api/auth', authRoutes)

export default app