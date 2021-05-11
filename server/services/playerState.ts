import axios from 'axios'

const url = process.env.NODE_ENV === 'development' ? 'http://localhost:5001/mafia-cubana/us-central1' : 'http://localhost/mafia-cubana/us-central1'

interface GamesAsRole {
  games: number,
  wins: number
}

export default interface PlayerState {
  chefe: GamesAsRole
  policial: GamesAsRole
  motorista: GamesAsRole
  mendigo: GamesAsRole
  assassino: GamesAsRole
  capanga: GamesAsRole
  ladrão: GamesAsRole
  total: GamesAsRole
}

export async function getPlayerState(): Promise<PlayerState> {
  const response = await axios.get(`${url}/getPlayer`)
  return response.data
}
