let sha256 = require('sha256')
let faker = require('faker/locale/pt_BR')

exports.seed = knex => knex('entregador')
  .del()
  .then(() => {
    // Inserts seed entries

    let entregadoresPadrao = [
      {
        nome: 'Reynaldo Marinho Monteiro Maciel',
        email: 'reynaldo@email.com',
        senha: sha256('123qwe'),
      },
      {
        nome: 'Higor Fernando Nunes',
        email: 'hfn@email.com',
        senha: sha256('123qwe'),
      },
    ]

    let entregadoresAleatorios = []
    for (let i = 0; i < 1000; i += 1) {
      entregadoresAleatorios.push({
        nome: faker.name.findName(),
        email: faker.internet.email(),
        senha: sha256('123qwe'),
        cep: faker.address.zipCode(),
        estado: faker.address.state(),
        cidade: faker.address.city(),
      })
    }

    return knex('entregador').insert([
      ...entregadoresPadrao,
      ...entregadoresAleatorios,
    ])
  })
