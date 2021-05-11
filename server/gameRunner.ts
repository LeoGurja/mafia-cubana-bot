import { Message, Client } from 'discord.js'
import Game, { GameState } from './models/game'
import Roles from './models/roles'
import Player from './models/player'
import render from './views'
import getChannel from './helpers/channel'
import Box from './models/box'
import isValidPlayerNumber from './helpers/isValidPlayerNumber'

export default class GameRunner {
  static async join(game: Game, msg: Message) {
    if (this.isAlreadyPlaying(game, msg)) {
      msg.reply('Você já está no jogo, bestinha')
      return
    }

    if (game.state !== GameState.Joining) {
      msg.reply('Chegou atrasado! O jogo já começou.')
    }

    if (game.players.length < 12) {
      this.addPlayer(game, msg)
    } else {
      msg.reply('A sala já está cheia!')
    }
  }

  static async start(game: Game, diamonds: number, msg: Message) {
    if (!isValidPlayerNumber(game.players.length)) {
      msg.reply('Precisa de mais jogadores para jogar!')
      return
    }
    game.box = new Box(diamonds, game.players.length, game.assassino)
  }

  static async pickBoss(game: Game, client: Client) {
    const boss = game.players[0]
    boss.role = Roles.Chefe
    this.sendPrivateMessage(boss, client, render('boss.ejs', {}))
  }

  private static isAlreadyPlaying(game: Game, msg: Message) {
    return (
      game.players.some(player => player.playerId === msg.author.id)
    )
  }

  private static addPlayer(game: Game, msg: Message) {
    game.players.push(new Player(msg.author.id))
    this.sendMessage(game, msg, `<@${msg.author.id}> entrou no jogo!`)
  }

  private static sendMessage(game: Game, { reply }: Message, message: string) {
    getChannel(game.guild).then(channel => {
      channel.send(message)
    }).catch(err => {
      reply(err)
    })
  }

  private static sendPrivateMessage(player: Player, client: Client, message: string) {
    client.users.fetch(player.playerId)
      .then(user => user.send(message))
  }
}
