import { Model } from 'objection'
import knex from '../config/database/knex'
import BaseModel from './BaseModel'

Model.knex(knex)

export default class Pedido extends BaseModel {
  static get tableName() {
    return 'pedido'
  }
  static get idColumn() {
    return 'idPedido'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['codigo'],

      properties: {
        idPedido: { type: 'integer' },
        idSolicitante: { type: 'integer' },
        codigo: { type: 'string', minLength: 1, maxLength: 255 }
      }
    }
  }
  // Relacionamentos
  static relationMappings = {
    solicitante: {
      relation: Model.BelongsToOneRelation,
      modelClass: 'Solicitante',
      join: {
        from: 'pedido.idSolicitante',
        to: 'solicitante.idSolicitante'
      }
    },
    entregador: {
      relation: Model.BelongsToOneRelation,
      modelClass: 'Entregador',
      join: {
        from: 'pedido.idEntregador',
        to: 'entregador.idEntregador'
      }
    }
  }
}
