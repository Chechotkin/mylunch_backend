import fs from 'fs'
import path from 'path'
import knex from '../../src/config/database/knex'

const MIGRATION_FOLDER = path.resolve('src/migrations/')

// Down all migrations
export const runAllMigrationsDown = () => {
  let files = fs.readdirSync(MIGRATION_FOLDER)
  return Promise.all(files.sort((a, b) => b - a).map((file) => {
    // eslint-disable-next-line
    let migration = require(`${MIGRATION_FOLDER}/${file}`)
    return migration.down(knex)
  }))
}

// Up all migrations
export const runAllMigrationsUp = () => {
  let files = fs.readdirSync(MIGRATION_FOLDER)
  return Promise.all(files.map((file) => {
    // eslint-disable-next-line
    let migration = require(`${MIGRATION_FOLDER}/${file}`)
    return migration.up(knex)
  }))
}
