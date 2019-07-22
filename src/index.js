// Módulo de variáveis de ambiente
import { config } from 'dotenv'

// Express
import express from 'express'

// CORS
import cors from 'cors'

import bodyparser from 'body-parser'

// Auth Middleware
import auth from './middlewares/auth'

// Graphql Http
import graphqlhttp from './graphql'

// Le arquivo .env.testing quando NODE_ENV = testing
config(process.env.NODE_ENV === 'testing' ? { path: './.env.testing' } : null)

// Inicializa express
const app = express()

app.use(cors())

app.use(bodyparser.json())

// Playground
const expressPlayground = require('graphql-playground-middleware-express').default

// Auth Middleware
app.use('/graphql', auth, graphqlhttp)

// Graphql Playground
if (process.env.NODE_ENV !== 'production') {
  app.get('/playground', expressPlayground({ endpoint: '/graphql' }))
}

app.listen(process.env.PORT || 3001, () => {
  console.log('Example app listening on port 3001!')
})
