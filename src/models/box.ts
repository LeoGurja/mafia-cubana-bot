import { ChoosableRole } from './role'

interface Box {
  diamonds: number,
  roles: ChoosableRole[],
  closed_role?: ChoosableRole
}

export function createBox(diamonds: number, players: number) {
  return {
    diamonds,
    roles: createRoles(players),
  }
}

function createRoles(_: number) {
  return []
}

export default Box