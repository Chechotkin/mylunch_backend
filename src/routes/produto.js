import express from 'express'
import produtoController from '../controllers/produto'

let router = express.Router()

/**
 * @swagger
 * /produto/criar:
 *   post:
 *     summary: Cria Produto para establecimento logado
 *     description: Cria Produto para establecimento logado
 *     tags:
 *       - Produto
 *     parameters:
 *       - in: body
 *         name: nome
 *         type: string
 *         required: true
 *       - in: body
 *         name: valor
 *         type: integer
 *         required: true
 *     responses:
 *       201:
 *         description: Cria Produto para establecimento logado
 *         schema:
 *           type: object
 *           properties:
 *             idProduto:
 *               type: integer
 *               description: id do produto criado
 */
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
