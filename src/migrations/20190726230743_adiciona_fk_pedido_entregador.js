
exports.up = knex => knex.schema.alterTable('pedido', table => table.integer('idEntregador', 10)
  .unsigned()
  .references('idEntregador')
  .inTable('entregador'))

exports.down = knex => knex.schema.alterTable('pedido', table => Promise.all([
  table.dropForeign('idEntregador'),
  table.dropColumn('idEntregador'),
]))
