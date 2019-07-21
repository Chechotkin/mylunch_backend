exports.up = knex => knex.schema.createTable('pedido', (table) => {
  table.increments('idPedido').primary()
  table.string('codigo')
  table
    .integer('idSolicitante', 10)
    .unsigned()
    .notNullable()
    .references('idSolicitante')
    .inTable('solicitante')
})

exports.down = knex => knex.schema.dropTable('pedido')
