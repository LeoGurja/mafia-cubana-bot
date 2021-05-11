import dotenv from 'dotenv'
import { Client, ClientOptions, Intents } from 'discord.js'
import guildCommands, { isGuildCommand } from './guildCommands'
import dmCommands, { isDmCommand } from './dmCommands'

dotenv.config()

type Options = ClientOptions & { intents: number[] }

const options: Options = {
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS
  ]
}

const client = new Client(options)

client.login(process.env.DISCORD_TOKEN)

client.on('message', msg => {
  if (msg.author.bot) return

  if (isGuildCommand(msg.content)) {
    if (msg.guild) return guildCommands[msg.content](msg)
    msg.reply('Esse comando só funciona em servidores, bobo.')
  }
  if (isDmCommand(msg.content)) return dmCommands[msg.content](msg)
})

// function getUserFromMention(mention: string) {
//   mention = mention.slice(2, -1)

//   if (mention.startsWith('!')) {
//     mention = mention.slice(1);
//   }

//   return client.users.cache.get(mention)
// }
