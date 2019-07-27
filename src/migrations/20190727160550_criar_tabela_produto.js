exports.up = knex => knex.schema.createTable('produto', (table) => {
  table.increments('idProduto').primary()
  table.string('nome')
  table.integer('valor')
  table.text('descricao')
  table.integer('idEstabelecimento', 10)
    .notNullable()
    .references('idEstabelecimento')
    .inTable('estabelecimento')
})

exports.down = knex => knex.schema.dropTable('produto')
