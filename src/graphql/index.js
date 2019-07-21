// Express-Graphql
import graphqlHTTP from 'express-graphql'

// Objection Graphql
import objectionGraphql from 'objection-graphql'

// Models
import { Pedido, Solicitante, Entregador } from '../models'

// Mutations
import RootMutation from './mutations'

let graphQlBuilder = objectionGraphql.builder

const graphQlSchema = graphQlBuilder()
  .model(Pedido)
  .model(Solicitante)
  .model(Entregador, {
    listFieldName: 'entregadores',
    fieldName: 'entregador',
  })
  .extendWithMutations(RootMutation)
  .build()

export default graphqlHTTP({
  schema: graphQlSchema,
  graphiql: false, // Graphiql not enable, search for graphql-playground
})
