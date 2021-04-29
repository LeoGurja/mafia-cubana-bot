import Player from './player'
import Box from './box'
import { TextChannel, Message } from 'discord.js'
import getChannel from '../helpers/channel'

interface Game {
  guesses: number,
  box?: Box,
  state: GameState,
  players: Player[],
  channel: TextChannel
}

export enum GameState {
  JOINING,
  STARTING,
  PICKING,
  PLAYING,
  ENDING
}

export async function createGame(msg: Message): Promise<Game> {
  const channel = await getChannel(msg)

  if (!channel) return Promise.reject('não há canal para criar o jogo')

  return {
    players: [],
    guesses: 0,
    state: GameState.JOINING,
    channel
  }
}

export default Game

