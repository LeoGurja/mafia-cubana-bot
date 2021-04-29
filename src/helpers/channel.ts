import { Channel, Message, TextChannel } from "discord.js"

export default async function getChannel({ guild, reply }: Message): Promise<TextChannel> {
  if (!guild) {
    reply('Não consigo criar um canal fora de um servidor!')
    return Promise.reject('Não dá pra criar um canal fora de um servidor')
  }

  if (!guild.me) {
    reply('Fiquei doidão. Chama o gurja!!!1!')
    return Promise.reject('Não existe meu id??')
  }
  
  if (!guild.me.hasPermission('MANAGE_CHANNELS')) {
    reply('Não tenho permissão pra gerenciar canais, chama o ademir.')
    return Promise.reject('Sem permissão pra criar canal')
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

  if (!isTextChannel(channel)) return Promise.reject('Não é um canal do tipo certo??')
  return channel
}

function isTextChannel(channel: Channel): channel is TextChannel {
  return channel.type === 'text'
}
