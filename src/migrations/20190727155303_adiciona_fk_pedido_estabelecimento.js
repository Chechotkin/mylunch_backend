
exports.up = knex => knex.schema.alterTable('pedido', table => table.integer('idEstabelecimento', 10)
  .unsigned()
  .notNullable()
  .references('idEstabelecimento')
  .inTable('estabelecimento'))

exports.down = knex => knex.schema.alterTable('pedido', table => Promise.all([
  table.dropForeign('idEstabelecimento'),
  table.dropColumn('idEstabelecimento'),
]))
