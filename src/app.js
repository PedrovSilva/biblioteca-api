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

app.use(cors({
  origin: '*', // ou ['http://localhost:3000', 'http://localhost:3001'] para múltiplas
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true })) 
// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Rotas
app.use('/generos', generoRoutes)
app.use('/livros', livroRoutes)

export default app
