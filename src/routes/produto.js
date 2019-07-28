import express from 'express'
import produtoController from '../controllers/produto'

let router = express.Router()

/**
 * @swagger
 * /produto/criar:
 *   post:
 *     summary: Criar produto
 *     description: Criar produto vinculado ao estabelecimento logado
 *     tags:
 *       - Produto
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                  type: string
 *               valor:
 *                  type: integer
 *               descricao:
 *                  type: string
 *     responses:
 *       200:
 *         description: Produto criado
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *               description: token solicitante
 *       400:
 *         description: Usuário não econtrado | Senha incorreta
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Mensagem de erro
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
