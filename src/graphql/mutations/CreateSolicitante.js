import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLInputObjectType,
} from 'graphql'

import CreateSolicitanteResolver from '../resolvers/CreateSolicitante'

const solicitanteType = new GraphQLObjectType({
  name: 'CreateSolicitanteType',
  description: 'Criar novo solicitante',
  fields: () => ({
    idSolicitante: {
      type: GraphQLInt,
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

const createSolicitanteInputType = new GraphQLInputObjectType({
  name: 'CreateSolicitanteInputType',
  description: 'Solicitante',
  fields: () => ({
    nome: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Nome do Solicitante',
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Email do Solicitante',
    },
    senha: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Senha do Solicitante',
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
  }),
})

export default {
  description: 'Criar novo solicitante',
  type: solicitanteType,
  args: {
    input: { type: new GraphQLNonNull(createSolicitanteInputType) },
  },
  resolve: CreateSolicitanteResolver,
}
