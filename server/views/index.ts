import * as ejs from 'ejs'
import fs from 'fs'

export default function render(filename: string, args: any): string {
  const file = fs.readFileSync(`server/views/${filename}`, 'utf8')
  return ejs.render(file, args)
}
