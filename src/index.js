// Módulo de variáveis de ambiente
import { config } from 'dotenv'

// Express
import express from 'express'

// CORS
import cors from 'cors'

import bodyparser from 'body-parser'

// AuthGraphql Middleware
// import authGraphql from './middlewares/authGraphql'

// Graphql Http
// import graphqlhttp from './graphql'

// AuthRest middleware
import auth from './middlewares/authRest'


import router from './routes'

// Playground
const expressPlayground = require('graphql-playground-middleware-express').default

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
if (process.env.NODE_ENV !== 'production') {
  app.get('/playground', expressPlayground({ endpoint: '/graphql' }))
}

app.listen(process.env.PORT || 3001, () => {
  console.log(`App running on port ${process.env.PORT || 3001}!`)
})
