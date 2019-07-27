import jwt from 'jsonwebtoken'
import {
  alowedEndpoints,
} from './alowedEndpoints.json'

let endpointIsAllowed = (path, method) => {
  let endpoint = alowedEndpoints.find(e => e.path === path)
  if (endpoint) {
    let alowedMethods = endpoint.alowedMethods.find(x => x === method)

    return alowedMethods ? endpoint : false
  }
}

export default (req) => {
  let isAllowed = endpointIsAllowed(req.originalUrl, req.method)
  if (isAllowed) {
    if (isAllowed.needToken) {
      let authHeader = req.headers.authorization

      if (!authHeader) throw new Error('Authorization header is required')

      jwt.verify(authHeader, process.env.JWT_SECRET, (error, decoded) => {
        if (error) throw new Error('Token is invalid')

        if (decoded.tipo !== 'entregador') {
          throw new Error('Token não permite essa operação')
        }
        req.idEntregador = decoded.idEntregador
      })
    }
  } else {
    throw new Error('Request not allowed')
  }
}
