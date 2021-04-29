import { Message } from "discord.js"
import Game, { GameState, createGame } from './models/game'
import Player, { createPlayer } from './models/player'
import GameCount, { GameCountInstance } from './models/game_count'
import { keyv, seq } from './models/db'
import shuffle from './helpers/shuffle'

type GuildCommand = '!ping' | '!join' | '!players'

const commands = {
  '!ping': pong,
  '!join': join,
  '!players': players,
  '!start': start
}

export default commands

export function isGuildCommand(content: string): content is GuildCommand {
  return content in commands
}

function pong(msg: Message) {
  msg.reply('pong')
}

async function start(msg: Message) {
  if (!msg.guild?.id) return

  const game: Game = await keyv.get(msg.guild.id)
  
  if (!game) {
    msg.reply('Começar o quê? Não tem nenhum jogo, coisinha.')
  }

  game.state = GameState.STARTING
  const boss = await pickBoss(game.players)
  boss.role = 'Chefe'
  msg.client.users.fetch(boss.id).then(user => {
    user.send('Você é o Chefe! Escolha um número de diamantes (de 10 a 20)')
  })

  keyv.set(msg.guild.id, game)
}

// async function getDiamondCount(boss: Player) {
  
//   boss.id
// }

async function pickBoss(players: Player[]): Promise<Player> {
  let games, selected = shuffle(players)[0]
  if (!selected) throw new Error('Não selecionou um chefe ??')

  const gameCounts: Array<GameCountInstance> = await GameCount.findAll({
    attributes: [
      'player_id',
      [seq.fn('sum', seq.col('games')), 'total_games'] 
    ],
    where: {
      player_id: players.map(p => p.id)
    },
    group: ['player_id']
  })

  if (gameCounts.every(count => count.games === 0)) return selected

  while (games === 0) {
    games = await GameCount.sum('games', {
      where: {
        player_id: selected.id
      }
    })
    selected = shuffle(players)[0]
    if (!selected) throw new Error('Escolheu nenhum chefe ???')
  }
  return selected
}

async function players(msg: Message) {
  if (!msg.guild) {
    msg.reply('Parceiro, eu só funciono direito em servidores.')
    return
  }

  const game: Game = await keyv.get(msg.guild.id)

  if (!game) {
    msg.reply('Não tem ninguém jogando agora :/')
    return
  }

  msg.channel.send(`Jogadores:\n${game.players.reduce((acc, curr) => `${acc} <@${curr.id}>\n`, '')}`)
}

async function join(msg: Message) {
  if (!msg?.guild?.id) {
    msg.reply('Não consigo criar uma partida fora de um servidor!')
    return
  }

  const game: Game = await keyv.get(msg.guild.id) || await createGame(msg)

  if (game.players.some(player => player.id === msg.author.id)) {
    msg.reply('Você já está no jogo, bestinha')
    return
  }

  if (game.state !== GameState.JOINING) {
    msg.reply('Desculpa, você chegou atrasado! O jogo já começou')
    return
  }

  game.players.push(createPlayer(msg.author.id))
  game.channel.send(`<@${msg.author.id}> entrou no jogo!`)

  keyv.set(msg.guild.id, game)
}