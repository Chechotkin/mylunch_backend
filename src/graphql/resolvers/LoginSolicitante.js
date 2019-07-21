// Models
import jwt from 'jsonwebtoken'

import sha256 from 'sha256'
import { Solicitante } from '../../models'

export default async (root, inputSolicitante) => {
  let { email, senha } = inputSolicitante.input
  let solicitante = await Solicitante.query().findOne({
    email,
  })

  if (!solicitante) {
    throw new Error('Nenhum solicitante encontrado com o email informado')
  }

  if (solicitante.senha !== sha256(senha)) {
    throw new Error('Senha incorreta, tente novamente')
  }

  let token = jwt.sign(
    { email, senha, tipo: 'solicitante' },
    process.env.JWT_SECRET,
  )
  delete solicitante.senha
  return {
    ...solicitante,
    token,
  }
}
