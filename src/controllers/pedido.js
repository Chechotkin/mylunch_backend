import moment from 'moment'
import { Pedido } from '../models'

const gerarCodigo = async (dataBase) => {
  let now = dataBase ? moment(dataBase, 'YYYY-MM-DD') : moment()
  let hoje = now.set('hour', 0).set('minute', 0).set('second', 0)
  let amanha = now.set('hour', 0).set('minute', 0).set('second', 0)
    .add(1, 'days')

  let ultimoPedidoDoDia = await Pedido.query().whereBetween('data_criacao', [hoje.format('YYYY-MM-DD HH:mm:ss'), amanha.format('YYYY-MM-DD HH:mm:ss')]).orderBy('codigo', 'desc').first()
  return ultimoPedidoDoDia ? (ultimoPedidoDoDia.idPedido + 1).toString() : '1'
}

const criarPedido = async (pedido, idSolicitante) => {
  let codigo = await gerarCodigo()

  let novoPedido = await Pedido.query().insertAndFetch({
    ...pedido,
    codigo,
    idSolicitante,
  })
  return novoPedido.idPedido
}

export default {
  criarPedido,
}
