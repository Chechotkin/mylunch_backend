import express from 'express'
import solicitanteController from '../controllers/solicitante'

let router = express.Router()

/**
 * @swagger
 * /add:
 *   post:
 *     summary: Registra solicitante
 *     description: Registra solicitante
 *     tags:
 *       - Solicitante
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
    let novoSolicitante = await solicitanteController.registrar(req.body)
    res.status(201).json(novoSolicitante)
  } catch (error) {
    res.status(error.statusCode ? error.statusCode : 500).send(error.message ? error.message : 'Erro desconhecido')
  }
})

/**
 * @swagger
 * /solicitante/login:
 *   post:
 *     summary: Login Solicitante
 *     description: Obter JWT Solicitante
 *     tags:
 *       - Solicitante
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
 *         description: Loga Solicitante
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
router.post('/login', async (req, res) => {
  try {
    let token = await solicitanteController.login(req.body)

    res.status(200).json({ token })
  } catch (error) {
    res.status(error.statusCode ? error.statusCode : 500).send(error.message ? error.message : 'Erro desconhecido')
  }
})

export default { path: '/solicitante', router }
