import swaggerJSDoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Catálogo de Livros API',
      version: '1.0.0',
      description: 'API para gerenciamento de livros e gêneros',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local'
      }
    ]
  },
  apis: ['./src/routes/*.js'], // Arquivos onde estão os comentários Swagger
}

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec
