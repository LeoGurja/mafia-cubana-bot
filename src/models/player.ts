import Role from './role'

interface Player {
  id: string,
  role?: Role
}

export function createPlayer(id: string): Player {
  return {
    id,
  }
}

export default Player