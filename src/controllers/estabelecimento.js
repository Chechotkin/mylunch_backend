import sha256 from 'sha256'
import jwt from 'jsonwebtoken'

import { Estabelecimento } from '../models'

const registrar = async (estabelecimento) => {
  let alreadyCreated = await Estabelecimento.query().where({ email: estabelecimento.email }).first()
  if (alreadyCreated) {
    let error = { message: 'Email já cadastrado', statusCode: 400 }
    throw error
  }

  let novoEstabelecimento = await Estabelecimento.query().insertAndFetch({
    ...estabelecimento,
    senha: sha256(estabelecimento.senha),
  })
  delete novoEstabelecimento.senha
  return novoEstabelecimento
}

const login = async (estabelecimento) => {
  let { email, senha } = estabelecimento
  let user = await Estabelecimento.query().where({ email }).first()

  if (!user) {
    let error = { message: 'Usuário não encontrado', statusCode: 400 }
    throw error
  }

  if (sha256(senha) !== user.senha) {
    let error = { message: 'Senha incorreta', statusCode: 400 }
    throw error
  }

  return jwt.sign(
    { idEstabelecimento: user.idEstabelecimento, email, tipo: 'estabelecimento' },
    process.env.JWT_SECRET,
  )
}

export default {
  registrar,
  login,
}
