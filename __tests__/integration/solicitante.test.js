import axios from 'axios'
import { runAllMigrationsDown, runAllMigrationsUp } from '../utils/clearDatabase'

describe('Testes de solicitante', () => {
  beforeAll(async () => {
    await runAllMigrationsDown()
    await runAllMigrationsUp()
  })

  test('teste do teste', async () => {
    expect(true).toBe(true)
  })

  test('Criação de um solicitante', async () => {
    let response = await axios.post('http://localhost:3001/graphql', {
      query: `
        mutation{
          createSolicitante(input: {
            nome: "Solicitante 1"
            email: "solicitante1@email.com"
            senha: "123qwe"
          }){
            nome
            email
            token
          }
        }
      `,
    })
    let {
      nome, email, token,
    } = response.data.data.createSolicitante
    expect(nome).toBe('Solicitante 1')
    expect(email).toBe('solicitante1@email.com')
    expect(token).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
  })
  test('Login de um solicitante', async () => {
    let response = await axios.post('http://localhost:3001/graphql', {
      query: `
        mutation{
          loginSolicitante(input: {
            email: "solicitante1@email.com"
            senha: "123qwe"
          }){
            email
            token
          }
        }
      `,
    })
    let { email, token } = response.data.data.loginSolicitante
    expect(email).toBe('solicitante1@email.com')
    expect(token).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
  })
})
