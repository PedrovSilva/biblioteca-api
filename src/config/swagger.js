// swagger.js
import swaggerJSDoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Catálogo de Livros API',
      version: '1.0.0',
      description: 'API para gerenciamento de livros e gêneros',
    }
    // ⛔ não inclua `servers` aqui
  },
  apis: ['./src/routes/*.js'],
}

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec
