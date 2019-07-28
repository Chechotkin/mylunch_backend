import express from 'express'
import entregadorController from '../controllers/entregador'

let router = express.Router()

/**
 * @swagger
 * /entregador/registrar:
 *   post:
 *     summary: Registra Entregador
 *     description: Registra entregador
 *     tags:
 *       - Entregador
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
    let novoEntregador = await entregadorController.registrar(req.body)
    res.status(201).json(novoEntregador)
  } catch (error) {
    res.status(error.statusCode ? error.statusCode : 500).send(error.message ? error.message : 'Erro desconhecido')
  }
})
/**
 * @swagger
 * /entregador/login:
 *   post:
 *     summary: Login Entregador
 *     description: Obter JWT Solicitante
 *     tags:
 *       - Entregador
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
 *         description: Loga Entregador
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *               description: token entregador
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
    let token = await entregadorController.login(req.body)
    res.status(200).json({ token })
  } catch (error) {
    res.status(error.statusCode ? error.statusCode : 500).send(error.message ? error.message : 'Erro desconhecido')
  }
})

export default { path: '/entregador', router }
