import { Model } from 'sequelize/types'
import db, { seq } from './db'
import Role, { roles } from './role'

interface GameCountAttributes {
  games: number,
  wins: number,
  as_role: Role,
  player_id: string
}

export interface GameCountInstance extends Model<GameCountAttributes>, GameCountAttributes {}

const GameCount = db.define<GameCountInstance>('games_counts', {
  games: {
    type: seq.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  wins: {
    type: seq.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  as_role: {
    type: seq.ENUM,
    values: roles,
    allowNull: false
  },
  player_id: {
    type: seq.STRING,
    allowNull: false
  }
})

GameCount.sync()

export default GameCount