import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/swagger.js'

import connectDB from './config/db.js'
import seedGeneros from './seeds/generos.js' // ⬅️ novo import

import generoRoutes from './routes/generoRoutes.js'
import livroRoutes from './routes/livroRoutes.js'

dotenv.config()

const app = express()

// Conecta e executa o seed antes de exportar
const init = async () => {
  await connectDB()
  await seedGeneros() // ⬅️ Executa o seed após conexão
}

init()

// Middlewares
app.use(cors({
  origin: '*',
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
