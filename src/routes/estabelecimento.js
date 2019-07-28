import express from 'express'
import estabelecimentoController from '../controllers/estabelecimento'

let router = express.Router()

/**
 * @swagger
 * /estabelecimento/registrar:
 *   post:
 *     summary: Registra estabelecimento
 *     description: Registra estabelecimento
 *     tags:
 *       - Estabelecimento
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                  type: string
 *               senha:
 *                  type: string
 *     responses:
 *       200:
 *         description: Registrado com sucesso
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               default: 'Added'
 */
router.post('/registrar', async (req, res) => {
  try {
    let novoEstabelecimento = await estabelecimentoController.registrar(req.body)
    res.status(201).json(novoEstabelecimento)
  } catch (error) {
    res.status(error.statusCode ? error.statusCode : 500).send(error.message ? error.message : 'Erro desconhecido')
  }
})

/**
 * @swagger
 * /estabelecimento/login:
 *   post:
 *     summary: Login Estabelecimento
 *     description: Obter JWT Estabelecimento
 *     tags:
 *       - Estabelecimento
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                  type: string
 *               senha:
 *                  type: string
 *     responses:
 *       200:
 *         description: Loga estabelecimento
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *               description: token estabelecimento
 *       400:
 *         description: Usuário não econtrado | Senha incorreta
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Mensagem de erro
 */
router.post('/login', async (req, res) => {
  try {
    let token = await estabelecimentoController.login(req.body)
    res.status(200).json({ token })
  } catch (error) {
    res.status(error.statusCode ? error.statusCode : 500).send(error.message ? error.message : 'Erro desconhecido')
  }
})

export default { path: '/estabelecimento', router }
