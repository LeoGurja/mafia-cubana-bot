import Sequelize from 'sequelize'
import Keyv from 'keyv'

const db = new Sequelize.Sequelize({
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  storage: 'db.sqlite'
})

export const keyv = new Keyv()
export const seq = Sequelize

keyv.on('error', err => console.error('Keyv connection error:', err))
keyv.clear()

export default db