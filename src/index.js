// Módulo de variáveis de ambiente
import { config } from 'dotenv'

import path from 'path'

// Express
import express from 'express'

// CORS
import cors from 'cors'

import bodyparser from 'body-parser'

// AuthGraphql Middleware
// import authGraphql from './middlewares/authGraphql'

// Graphql Http
// import graphqlhttp from './graphql'

// Swagger + JsDoc
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'

// AuthRest middleware
import auth from './middlewares/authRest'

import router from './routes'

// Playground
// const expressPlayground = require('graphql-playground-middleware-express').default

// Le arquivo .env.testing quando NODE_ENV = testing
config(process.env.NODE_ENV === 'testing' ? { path: './.env.testing' } : null)

// Inicializa express
const app = express()

app.use(cors())

app.use(bodyparser.json())

// AuthGraphql Middleware
// app.use('/graphql', authGraphql, graphqlhttp)

router(app, auth)

// AuthRest Middleware
// app.use('/api', router.solicitante())

// Graphql Playground
// if (process.env.NODE_ENV !== 'production') {
//   app.get('/playground', expressPlayground({ endpoint: '/graphql' }))
// }

const swaggerDefinition = {
  info: {
    title: 'MySQL Registration Swagger API',
    version: '1.0.0',
    description: 'Endpoints to test the user registration routes',
  },
  host: 'localhost:3001',
  basePath: '/',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
}
const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'],
}
const swaggerSpec = swaggerJSDoc(options)

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})

app.get('/docs', (req, res) => {
  res.sendFile(path.join(__dirname, '../docs/index.html'))
})

app.listen(process.env.PORT || 3001, () => {
  console.log(`App running on port ${process.env.PORT || 3001}!`)
})
