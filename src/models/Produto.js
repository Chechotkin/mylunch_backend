import { Model } from 'objection'
import knex from '../config/database/knex'
import BaseModel from './BaseModel'

Model.knex(knex)

export default class Produto extends BaseModel {
  static get tableName() {
    return 'produto'
  }
  static get idColumn() {
    return 'idProduto'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['nome', 'valor', 'idEstabelecimento'],

      properties: {
        idProduto: { type: 'integer' },
        nome: { type: 'string', minLength: 1, maxLength: 255 },
        valor: { type: 'integer' },
        descricao: { type: 'string', minLength: 1, maxLength: 10000 },
        idEstabelecimento: { type: 'integer' }
      }
    }
  }
  // Relacionamentos
  static relationMappings = {
    estabelecimento: {
      relation: Model.BelongsToOneRelation,
      modelClass: 'Estabelecimento',
      join: {
        from: 'produto.idEstabelecimento',
        to: 'estabelecimento.idEstabelecimento'
      }
    }
  }
}
