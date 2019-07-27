import express from 'express'
import pedidoController from '../controllers/pedido'

let router = express.Router()

router.post('/criar', async (req, res) => {
  try {
    let { idSolicitante } = req
    let pedido = await pedidoController.criarPedido(req.body, idSolicitante)
    res.status(200).json(pedido)
  } catch (error) {
    res.status(error.statusCode ? error.statusCode : 500).send(error.message ? error.message : 'Erro desconhecido')
  }
})

export default { path: '/pedido', router }
