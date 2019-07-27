import sha256 from 'sha256'
import jwt from 'jsonwebtoken'

import { Entregador } from '../models'

const registrar = async (entregador) => {
  let alreadyCreated = await Entregador.query().where({ email: entregador.email }).first()
  if (alreadyCreated) {
    let error = { message: 'Email já cadastrado', statusCode: 400 }
    throw error
  }

  let novoEntregador = await Entregador.query().insertAndFetch({
    ...entregador,
    senha: sha256(entregador.senha),
  })
  delete novoEntregador.senha
  return novoEntregador
}


const login = async (entregador) => {
  let { email, senha } = entregador
  let user = await Entregador.query().where({ email }).first()

  if (!user) {
    let error = { message: 'Usuário não encontrado', statusCode: 400 }
    throw error
  }

  if (sha256(senha) !== user.senha) {
    let error = { message: 'Senha incorreta', statusCode: 400 }
    throw error
  }

  return jwt.sign(
    { idEntregador: user.idEntregador, email, tipo: 'entregador' },
    process.env.JWT_SECRET,
  )
}

export default {
  registrar,
  login,
}
