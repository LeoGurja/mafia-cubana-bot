import Roles from './models/roles'
import { Message } from 'discord.js'
import Game, { GameState } from './models/game'
import GameRunner from './gameRunner'

type DmCommand = '!ping' | '!d' | '!a'
const options = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫']

const commands = {
  '!ping': pong,
  '!d': setDiamondCount,
  '!a': setAssassin
}

async function pong(msg: Message) {
  const response = await msg.reply('pong')
  for (const option of options) {
    await response.react(option)
  }

  response.awaitReactions(
    reaction => options.includes(reaction.emoji.name),
    { max: 10, time: 60000, errors: ['time'] }
  ).then(collected => {
    collected.forEach(reaction => msg.reply(reaction?.emoji?.name))
  }).catch(() => {
    msg.reply('Ninguém reagiu ao ping :/')
  })
}

async function setDiamondCount(msg: Message) {
  const game = await Game.get(msg)

  if (!game) {
    msg.reply('O jogo não existe?!')
    return
  }
  if (game.state !== GameState.Starting) return

  if (!game.players.some(
    player => player.playerId === msg.author.id && player.role === Roles.Chefe
  )) {
    await msg.reply('Você precisa ser o chefe!')
  }

  const diamonds = parseInt(msg.content.split(' ').slice(-1)[0])

  GameRunner.start(game, diamonds, msg)
  Game.save(game)
}

async function setAssassin(msg: Message) {
  const game = await Game.get(msg)

  if (!game) {
    msg.reply('O jogo não existe?!')
    return
  }

  game.assassino = msg.content.split(' ').slice(-1)[0] === 'on'
  msg.reply(game.assassino ? 'Teremos um assassino!' : 'Sem assassinos :(')
  Game.save(game)
}

export function isDmCommand(content: string): content is DmCommand {
  return content in commands
}

export default commands
