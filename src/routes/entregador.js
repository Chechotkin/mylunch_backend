import express from 'express'
import entregadorController from '../controllers/entregador'

let router = express.Router()

router.post('/registrar', async (req, res) => {
  try {
    let novoEntregador = await entregadorController.registrar(req.body)
    res.status(201).json(novoEntregador)
  } catch (error) {
    res.status(error.statusCode ? error.statusCode : 500).send(error.message ? error.message : 'Erro desconhecido')
  }
})

router.post('/login', async (req, res) => {
  try {
    let token = await entregadorController.login(req.body)
    res.status(200).json({ token })
  } catch (error) {
    res.status(error.statusCode ? error.statusCode : 500).send(error.message ? error.message : 'Erro desconhecido')
  }
})

export default { path: '/entregador', router }
