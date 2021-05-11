import { Message } from 'discord.js'
import Game, { GameState } from './models/game'
import GameRunner from './gameRunner'
import render from './views'
import keyv from './models/keyv'
import isValidPlayerNumber from './helpers/isValidPlayerNumber'

type GuildCommand = '!join' | '!players' | '!start'

const commands = {
  '!join': join,
  '!players': players,
  '!start': start
}

export default commands

async function start(msg: Message) {
  if (!msg?.guild) return
  const game = await Game.get(msg)

  if (!game) {
    msg.reply('Começar o quê? Não tem nenhum jogo, coisinha.')
    return
  }

  if (!isValidPlayerNumber(game.players.length)) {
    msg.reply('Precisa de mais jogadores para jogar!')
    return
  }

  game.state = GameState.Starting
  GameRunner.pickBoss(game, msg.client)

  keyv.set(msg.guild.id, game)
}

async function players(msg: Message) {
  if (!msg.guild) {
    msg.reply('Parceiro, eu só funciono direito em servidores.')
    return
  }

  const game = await Game.get(msg)

  if (!game) {
    msg.reply('Não tem ninguém jogando agora :/')
    return
  }

  msg.channel.send(render('players.ejs', { players: game.players }))
}

async function join(msg: Message) {
  if (!msg?.guild?.id) {
    msg.reply('Não consigo criar uma partida fora de um servidor!')
    return
  }

  const game = await Game.get(msg) || new Game(msg)
  GameRunner.join(game, msg)
  keyv.set(msg.guild.id, game)
}

export function isGuildCommand(content: string): content is GuildCommand {
  return content in commands
}
