import Player from '../models/player'
import Box from './box'
import { Message, Guild } from 'discord.js'
import keyv from './keyv'

export enum GameState {
  Joining,
  Starting,
  Picking,
  Playing,
  Ending
}

export default class Game {
  guesses: number = 0
  box?: Box
  state: GameState = GameState.Joining
  players: Player[] = []
  guild: Guild
  assassino: boolean = false

  constructor(msg: Message) {
    if (!msg.guild) {
      msg.reply('Não consigo criar uma partida fora de um servidor!')
      throw new Error('Não consigo criar uma partida fora de um servidor!')
    }

    this.guild = msg.guild
  }

  static async get(msg: Message): Promise<Game | null> {
    if (!msg?.guild?.id) {
      msg.reply('Não consigo criar uma partida fora de um servidor!')
      return null
    }

    return keyv.get(msg.guild.id)
  }

  static async save(game: Game) {
    return keyv.set(game.guild.id, game)
  }
}
