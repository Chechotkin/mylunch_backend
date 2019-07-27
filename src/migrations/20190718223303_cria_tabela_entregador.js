exports.up = knex => knex.schema.createTable('entregador', (table) => {
  table.increments('idEntregador').primary()
  table.string('nome')
  table.string('email')
  table.string('senha')
  table.string('cep')
  table.string('estado')
  table.string('cidade')
  table.string('bairro')
})

exports.down = knex => knex.schema.dropTable('entregador')
