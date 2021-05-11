import Roles from './roles'
import prep from './prepTable'

export default class Box {
  capangas: number
  motoristas: number
  policiais: number
  assassinos: number = 0
  coringas: number
  closedRole?: Roles

  constructor(public diamonds: number, public players: number, assassino: boolean) {
    const prepTable = prep(players)

    this.capangas = prepTable.capangas
    this.motoristas = prepTable.motoristas
    this.policiais = prepTable.policiais
    this.coringas = prepTable.coringas

    if (assassino) {
      this.capangas -= 1
      this.assassinos += 1
    }
  }
}
