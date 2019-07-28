import sha256 from 'sha256'
import jwt from 'jsonwebtoken'

import { Solicitante } from '../models'

const registrar = async (solicitante) => {
  let alreadyCreated = await Solicitante.query().where({ email: solicitante.email }).first()
  if (alreadyCreated) {
    let error = { message: 'Email já cadastrado', statusCode: 400 }
    throw error
  }

  let novoSolicitante = await Solicitante.query().insertAndFetch({
    ...solicitante,
    senha: sha256(solicitante.senha),
  })
  delete novoSolicitante.senha
  return novoSolicitante
}


const login = async (solicitante) => {
  let { email, senha } = solicitante
  let user = await Solicitante.query().where({ email }).first()
  if (!user) {
    let error = { message: 'Usuário não encontrado', statusCode: 400 }
    throw error
  }

  if (sha256(senha) !== user.senha) {
    let error = { message: 'Senha incorreta', statusCode: 500 }
    throw error
  }

  return jwt.sign(
    { idSolicitante: user.idSolicitante, email, tipo: 'solicitante' },
    process.env.JWT_SECRET,
  )
}

export default {
  registrar,
  login,
}
