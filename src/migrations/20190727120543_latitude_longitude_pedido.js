
exports.up = knex => knex.schema.alterTable('pedido', (table) => {
  table.decimal('latitude', 9, 6)
  table.decimal('longitude', 9, 6)
})

exports.down = knex => knex.schema.alterTable('pedido', table => table.dropColumns(['latitude', 'longitude']))
