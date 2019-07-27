
exports.up = knex => knex.schema.alterTable('pedido', table => table.datetime('data_criacao'))

exports.down = knex => knex.schema.alterTable('pedido', table => table.dropColumns(['data_criacao']))
