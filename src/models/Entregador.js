import { Model } from 'objection'
import knex from '../config/database/knex'
import BaseModel from './BaseModel'

Model.knex(knex)

export default class Solicitante extends BaseModel {
  static get tableName() {
    return 'entregador'
  }
  static get idColumn() {
    return 'idEntregador'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['nome', 'email', 'senha'],

      properties: {
        idSolicitante: { type: 'integer' },
        email: { type: 'string', minLength: 1, maxLength: 255 },
        nome: { type: 'string', minLength: 1, maxLength: 255 },
        senha: { type: 'string', minLength: 1, maxLength: 255 },
        cep: { type: 'string', minLength: 1, maxLength: 255 },
        estado: { type: 'string', minLength: 1, maxLength: 255 },
        cidade: { type: 'string', minLengidth: 1, maxLength: 255 },
        bairro: { type: 'string', minLength: 1, maxLength: 255 }
      }
    }
  }
  // Relacionamentos
  static relationMappings = {
    // pedidos: {
    //   relation: Model.HasManyRelation,
    //   modelClass: 'Pedido',
    //   join: {
    //     from: 'solicitante.idSolicitante',
    //     to: 'pedido.idSolicitante'
    //   }
    // }
  }
}
