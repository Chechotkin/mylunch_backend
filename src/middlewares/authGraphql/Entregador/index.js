import jwt from 'jsonwebtoken'
import { mutationsAllowed, queriesAllowed } from './alowedOperations.json'

let operationIsAllowed = (operation, name) => {
  switch (operation) {
    case 'mutation':
      return mutationsAllowed.find((e) => e.name === name) ? true : false
    case 'query':
      return queriesAllowed.find((e) => e.name === name) ? true : false
    default:
      return queriesAllowed.find((e) => e.name === name) ? true : false
  }
}

let operationNeedToken = (operation, name) => {
  switch (operation) {
    case 'mutation':
      return mutationsAllowed.find((e) => e.name === name && e.needToken)
        ? true
        : false
    case 'query':
      return queriesAllowed.find((e) => e.name === name && e.needToken)
        ? true
        : false
    default:
      return queriesAllowed.find((e) => e.name === name && e.needToken)
        ? true
        : false
  }
}

export default (req, operation, name) => {
  let authHeader = req.headers.authorization
  if (operationIsAllowed(operation, name)) {
    if (operationNeedToken(operation, name)) {
      if (!authHeader) throw new Error('Authorization header is required')

      jwt.verify(authHeader, process.env.JWT_SECRET, (error, decoded) => {
        if (error) throw new Error('Token is invalid')

        if (decoded.tipo !== 'entregador')
          throw new Error('Token não permite essa operação')
      })
    }
  } else {
    throw new Error('Operation not allowed')
  }
}

export const EntregadorHasMutationAllowed = (name) => {
  return mutationsAllowed.find((e) => e.name === name)
}

export const EntregadorHasQueryAllowed = (name) => {
  return queriesAllowed.find((e) => e.name === name)
}
