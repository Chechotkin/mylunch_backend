import express from 'express'
import solicitanteController from '../controllers/solicitante'

let router = express.Router()

router.post('/registrar', async (req, res) => {
  try {
    let novoSolicitante = await solicitanteController.registrar(req.body)
    res.status(201).json(novoSolicitante)
  } catch (error) {
    res.status(error.statusCode ? error.statusCode : 500).send(error.message ? error.message : 'Erro desconhecido')
  }
})

router.post('/login', async (req, res) => {
  try {
    let token = await solicitanteController.login(req.body)
    res.status(200).json({ token })
  } catch (error) {
    res.status(error.statusCode ? error.statusCode : 500).send(error.message ? error.message : 'Erro desconhecido')
  }
})

export default { path: '/solicitante', router }
