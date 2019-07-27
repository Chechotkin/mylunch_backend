import express from 'express'
import produtoController from '../controllers/produto'

let router = express.Router()

router.post('/criar', async (req, res) => {
  try {
    let { idEstabelecimento } = req
    let novoProduto = await produtoController.criar(req.body, idEstabelecimento)
    res.status(201).json(novoProduto)
  } catch (error) {
    res.status(error.statusCode ? error.statusCode : 500).send(error.message ? error.message : 'Erro desconhecido')
  }
})

export default { path: '/produto', router }
