import solicitanteAuthMiddleware from './Solicitante'
import entregadorAuthMiddleware from './Entregador'
import { alowedEndpoints as solicitanteEndpoints } from './Solicitante/alowedEndpoints'
import { alowedEndpoints as entregadorEndpoints } from './Entregador/alowedEndpoints'


export default (req, res, next) => {
  if (solicitanteEndpoints.find(x => x.path === req.originalUrl)) {
    solicitanteAuthMiddleware(req)
    next()
  } else if (entregadorEndpoints.find(x => x.path === req.originalUrl)) {
    entregadorAuthMiddleware(req)
    next()
  } else {
    res.status(404).send(`Not Found! ${process.env.NODE_ENV !== 'production' ? 'Maybe you forgot to add in alowedEndpoints' : null}`)
  }
}
