import { Channel, TextChannel, Guild } from 'discord.js'

export default async function getChannel(guild: Guild): Promise<TextChannel> {
  if (!guild.me) return Promise.reject(new Error('Fiquei doidão. Chama o gurja!!!1!'))
  if (!guild.me.hasPermission('MANAGE_CHANNELS')) {
    return Promise.reject(
      new Error('Não tenho permissão pra gerenciar canais, chama o ademir.')
    )
  }

  const channel = guild.channels.cache.find(
    channel => channel.name === 'mafia'
  ) || await guild.channels.create('mafia', {
    type: 'text',
    permissionOverwrites: [
      {
        id: guild.me.id,
        allow: ['SEND_MESSAGES']
      },
      {
        id: guild.id,
        deny: ['SEND_MESSAGES'],
        allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY']
      }
    ]
  })

  if (!isTextChannel(channel)) return Promise.reject(new Error('Não é um canal do tipo certo??'))
  return channel
}

function isTextChannel(channel: Channel): channel is TextChannel {
  return channel.type === 'text'
}
