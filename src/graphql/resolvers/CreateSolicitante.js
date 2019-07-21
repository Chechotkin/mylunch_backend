// Models
import jwt from 'jsonwebtoken'
import sha256 from 'sha256'
import { Solicitante } from '../../models'

export default async (root, inputSolicitante) => {
  let { senha } = inputSolicitante.input
  let newSolicitante = await Solicitante.query().insertAndFetch({
    ...inputSolicitante.input,
    senha: sha256(senha),
  })
  let token = jwt.sign({ ...newSolicitante, tipo: 'solicitante' }, process.env.JWT_SECRET)
  return {
    ...newSolicitante,
    token,
  }
}
