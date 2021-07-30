import express, { Application } from 'express'
import morgan from 'morgan'
const app: Application = express()

import authRoutes from './routes/auth'

// setting
app.set('port', 4000)
//middlewares
app.use(morgan('dev'))
//routes
app.use('/api/auth', authRoutes)

export default app