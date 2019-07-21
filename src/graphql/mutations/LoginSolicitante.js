import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLInputObjectType,
} from 'graphql'

import LoginSolicitanteResolver from '../resolvers/LoginSolicitante'

const solicitanteType = new GraphQLObjectType({
  name: 'LoginSolicitanteType',
  description: 'Criar novo solicitante',
  fields: () => ({
    idSolicitante: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Id do Solicitante',
    },
    nome: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Nome do Solicitante',
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Email do Solicitante',
    },
    cep: {
      type: GraphQLString,
      description: 'CEP do Solicitante',
    },
    estado: {
      type: GraphQLString,
      description: 'Estado do solicitante (Ex.: Espírito Santo)',
    },
    cidade: {
      type: GraphQLString,
      description: 'Cidade do solicitante (Ex.: Vitória)',
    },
    bairro: {
      type: GraphQLString,
      description: 'Bairro do solicitante (Ex.: Centro)',
    },
    token: {
      type: GraphQLString,
      description: 'JWT do solicitante',
    },
  }),
})

const loginSolicitanteInputType = new GraphQLInputObjectType({
  name: 'LoginSolicitanteInputType',
  description: 'Solicitante',
  fields: () => ({
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Email do Solicitante',
    },
    senha: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Senha do Solicitante',
    },
  }),
})

export default {
  description: 'Logar solicitante',
  type: solicitanteType,
  args: {
    input: { type: new GraphQLNonNull(loginSolicitanteInputType) },
  },
  resolve: LoginSolicitanteResolver,
}
