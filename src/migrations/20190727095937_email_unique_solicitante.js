
exports.up = knex => knex.schema.alterTable('solicitante', (table) => {
  table.unique('email')
})

exports.down = knex => knex.schema.alterTable('solicitante', (table) => {
  table.dropUnique('email')
})
