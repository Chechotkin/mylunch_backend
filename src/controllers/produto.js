import { Produto } from '../models'

const criar = async (produto, idEstabelecimento) => {
  let novoProduto = await Produto.query().insertAndFetch({
    ...produto,
    idEstabelecimento,
  })
  return novoProduto
}

export default {
  criar,
}
