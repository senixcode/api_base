import express, { Application } from 'express'
import cors from 'cors'
import morgan from 'morgan'

//swagger
import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { options } from './swaggerOptions'

// import routes
import authRoutes from './routes/auth.route'

//initialization
const app: Application = express()


// setting
app.set('port', 4000)

//middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//routes
const specs = swaggerJSDoc(options)

app.use('/api/auth', authRoutes)
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))

export default app