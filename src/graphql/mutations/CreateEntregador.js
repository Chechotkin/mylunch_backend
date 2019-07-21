import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLInputObjectType,
} from 'graphql'

import CreateEntregadorResolver from '../resolvers/CreateEntregador'

const entregadorType = new GraphQLObjectType({
  name: 'CreateEntregadorType',
  description: 'Criar novo entregador',
  fields: () => ({
    idEntregador: {
      type: GraphQLInt,
      description: 'Id do Entregador',
    },
    nome: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Nome do Entregador',
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Email do Entregador',
    },
    cep: {
      type: GraphQLString,
      description: 'CEP do Entregador',
    },
    estado: {
      type: GraphQLString,
      description: 'Estado do entregador (Ex.: Espírito Santo)',
    },
    cidade: {
      type: GraphQLString,
      description: 'Cidade do entregador (Ex.: Vitória)',
    },
    bairro: {
      type: GraphQLString,
      description: 'Bairro do entregador (Ex.: Centro)',
    },
    token: {
      type: GraphQLString,
      description: 'JWT do entregador',
    },
  }),
})

const createEntregadorInputType = new GraphQLInputObjectType({
  name: 'CreateEntregadorInputType',
  description: 'Entregador',
  fields: () => ({
    nome: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Nome do Entregador',
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Email do Entregador',
    },
    senha: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Senha do Entregador',
    },
    cep: {
      type: GraphQLString,
      description: 'CEP do Entregador',
    },
    estado: {
      type: GraphQLString,
      description: 'Estado do Entregador (Ex.: Espírito Santo)',
    },
    cidade: {
      type: GraphQLString,
      description: 'Cidade do Entregador (Ex.: Vitória)',
    },
    bairro: {
      type: GraphQLString,
      description: 'Bairro do Entregador (Ex.: Centro)',
    },
  }),
})

export default {
  description: 'Criar novo entregador',
  type: entregadorType,
  args: {
    input: { type: new GraphQLNonNull(createEntregadorInputType) },
  },
  resolve: CreateEntregadorResolver,
}
