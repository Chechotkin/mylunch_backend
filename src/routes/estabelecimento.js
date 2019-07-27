import express from 'express'
import estabelecimentoController from '../controllers/estabelecimento'

let router = express.Router()

router.post('/registrar', async (req, res) => {
  try {
    let novoEstabelecimento = await estabelecimentoController.registrar(req.body)
    res.status(201).json(novoEstabelecimento)
  } catch (error) {
    res.status(error.statusCode ? error.statusCode : 500).send(error.message ? error.message : 'Erro desconhecido')
  }
})

router.post('/login', async (req, res) => {
  try {
    let token = await estabelecimentoController.login(req.body)
    res.status(200).json({ token })
  } catch (error) {
    res.status(error.statusCode ? error.statusCode : 500).send(error.message ? error.message : 'Erro desconhecido')
  }
})

export default { path: '/estabelecimento', router }
