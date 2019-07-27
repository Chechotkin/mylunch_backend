
exports.up = knex => knex.schema.alterTable('entregador', (table) => {
  table.unique('email')
})

exports.down = knex => knex.schema.alterTable('entregador', (table) => {
  table.dropUnique('email')
})
