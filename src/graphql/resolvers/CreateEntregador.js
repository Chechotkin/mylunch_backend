// Models
import jwt from 'jsonwebtoken'

import sha256 from 'sha256'
import { Entregador } from '../../models'

export default async (root, inputEntregador) => {
  let { senha } = inputEntregador.input
  let newEntregador = await Entregador.query().insertAndFetch({
    ...inputEntregador.input,
    senha: sha256(senha),
  })
  let token = jwt.sign({ ...newEntregador, tipo: 'entregador' }, process.env.JWT_SECRET)
  return {
    ...newEntregador,
    token,
  }
}
