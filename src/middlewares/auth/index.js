import gql from 'graphql-tag'

import solicitanteAuthMidleware, {
  SolicitanteHasMutationAllowed,
  SolicitanteHasQueryAllowed,
} from './Solicitante'

import entregadorAuthMidleware, {
  EntregadorHasMutationAllowed,
  EntregadorHasQueryAllowed,
} from './Entregador'

let formatError = message => JSON.stringify({ errors: [{ message }] })

export default (req, res, next) => {
  try {
    if (req.body.operationName !== 'IntrospectionQuery') {
      let obj = gql`
        ${req.body.query}
      `

      // Obtem tipo de operacao (query ou mutation)
      let { operation } = obj.definitions[0]

      // Obtem nome de operacao (createSolicitante, loginEntregador)
      let name = obj.definitions[0].selectionSet.selections[0].name.value

      // console.log(EntregadorHasMutationAllowed(name))
      // console.log(EntregadorHasQueryAllowed(name))
      // throw new Error('teste')

      // Todo importar Entregador alowedOperation e concatenar
      switch (operation) {
        case 'mutation':
          if (SolicitanteHasMutationAllowed(name)) {
            solicitanteAuthMidleware(req, operation, name)
            break
          }
          if (EntregadorHasMutationAllowed(name)) {
            entregadorAuthMidleware(req, operation, name)
            break
          }
          break
        case 'query':
          if (SolicitanteHasQueryAllowed(name)) {
            solicitanteAuthMidleware(req, operation, name)
            break
          }
          if (EntregadorHasQueryAllowed(name)) {
            entregadorAuthMidleware(req, operation, name)
            break
          }
          break
        default:
          if (SolicitanteHasMutationAllowed(name)) {
            solicitanteAuthMidleware(req, operation, name)
            break
          }
          if (SolicitanteHasMutationAllowed(name)) {
            entregadorAuthMidleware(req, operation, name)
            break
          }
          break
      }
    }
    next()
  } catch (error) {
    res.send(formatError(error.message))
  }
}
