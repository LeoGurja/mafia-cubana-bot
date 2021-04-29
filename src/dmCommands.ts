import { Message } from "discord.js"

type DmCommand = '!ping'

const commands = {
  '!ping': pong
}

function pong(msg: Message) {
  msg.reply('pong')
}

export function isDmCommand(content: string): content is DmCommand {
  return content in commands
}


export default commands