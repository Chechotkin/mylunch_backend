import { Model } from 'objection'
import knex from '../config/database/knex'
import BaseModel from './BaseModel'

Model.knex(knex)

export default class Estabelecimento extends BaseModel {
  static get tableName() {
    return 'estabelecimento'
  }
  static get idColumn() {
    return 'idEstabelecimento'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['nome', 'email', 'senha'],

      properties: {
        idEstabelecimento: { type: 'integer' },
        email: { type: 'string', minLength: 1, maxLength: 255 },
        nome: { type: 'string', minLength: 1, maxLength: 255 },
        senha: { type: 'string', minLength: 1, maxLength: 255 },
        cep: { type: 'string', minLength: 1, maxLength: 255 },
        estado: { type: 'string', minLength: 1, maxLength: 255 },
        cidade: { type: 'string', minLengidth: 1, maxLength: 255 },
        bairro: { type: 'string', minLength: 1, maxLength: 255 },
        rua: { type: 'string', minLength: 1, maxLength: 255 },
        numero: { type: 'string', minLength: 1, maxLength: 255 },
        complemento: { type: 'string', minLength: 1, maxLength: 255 },
        latitude: { type: 'string', minLength: 1, maxLength: 255 },
        longitude: { type: 'string', minLength: 1, maxLength: 255 },
      }
    }
  }
  // Relacionamentos
  static relationMappings = {
    pedidos: {
      relation: Model.HasManyRelation,
      modelClass: 'Pedido',
      join: {
        from: 'estabelecimento.idEstabelecimento',
        to: 'pedido.idEstabelecimento'
      }
    }
  }
}
