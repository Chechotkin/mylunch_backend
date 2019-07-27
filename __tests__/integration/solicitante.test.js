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
})
