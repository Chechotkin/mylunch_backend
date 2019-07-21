exports.seed = (knex) => {
  knex('pedido')
    .truncate()
  knex('solicitante')
    .truncate()
  return knex('entregador')
    .truncate()
}
