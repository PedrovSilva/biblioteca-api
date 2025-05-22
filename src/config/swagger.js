import swaggerJSDoc from 'swagger-jsdoc'

const isCodespaces = !!process.env.CODESPACE_NAME

const serverUrl = isCodespaces
  ? `https://${process.env.CODESPACE_NAME}-3000.app.github.dev`
  : 'http://localhost:3000'

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
        url: serverUrl,
        description: isCodespaces ? 'GitHub Codespaces' : 'Servidor local',
      }
    ]
  },
  apis: ['./src/routes/*.js'], // Comentários Swagger nas rotas
}

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec
