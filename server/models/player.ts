import Roles from './roles'

export default class Player {
  role?: Roles
  won?: boolean

  constructor(public playerId: string) {}
}
