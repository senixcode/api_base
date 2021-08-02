import express, { Application, Response as Res } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
//swagger
import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { options } from './swaggerOptions'

// import routes
import authRoutes from './routes/auth.route'
import userRoutes from './routes/user.route'
import { NodeEnv } from './emuns'

//initialization
const app: Application = express()
if ([NodeEnv.dev, NodeEnv.test].includes(process.env.NODE_ENV as NodeEnv)) dotenv.config()

// setting
app.set('port', 4000)

//middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//routes
const specs = swaggerJSDoc(options)

app.get('/', (_, res: Res) => {
    res.json({
        author: "Luis Romero, @senixcode",
        description: "Is an api rest base with authentication (typscript, auth key, swagger, super test)",
    });
});

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))

// Handle 404
app.get('*', (_, res: Res) => {
    res.send('404: Route not Found');
});


export default app