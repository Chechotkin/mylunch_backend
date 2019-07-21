exports.seed = knex => knex('pedido')
  .del()
  .then(() => knex('pedido').insert([
    { codigo: '01', idSolicitante: 1 },
  ]))
