import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/swagger.js'

import connectDB from './config/db.js'
import generoRoutes from './routes/generoRoutes.js'
import livroRoutes from './routes/livroRoutes.js'

dotenv.config()

const app = express()
connectDB()

app.use(cors())
app.use(express.json())

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Rotas
app.use('/generos', generoRoutes)
app.use('/livros', livroRoutes)

export default app
