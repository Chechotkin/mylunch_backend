import { GraphQLObjectType } from 'graphql'

import createSolicitante from './CreateSolicitante'
import loginSolicitante from './LoginSolicitante'
import createEntregador from './CreateEntregador'

export default new GraphQLObjectType({
  name: 'RootMutationType',
  description: 'API Mutations',
  fields: () => ({
    createSolicitante,
    loginSolicitante,
    createEntregador,
  }),
})
