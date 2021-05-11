interface GamesAsRole {
  games: number,
  wins: number
}

export default interface Player {
  chefe: GamesAsRole
  policial: GamesAsRole
  motorista: GamesAsRole
  mendigo: GamesAsRole
  assassino: GamesAsRole
  capanga: GamesAsRole
  ladrão: GamesAsRole
  total: GamesAsRole
}

export function buildPlayer(): Player {
  return {
    chefe: { games: 0, wins: 0 },
    policial: { games: 0, wins: 0 },
    motorista: { games: 0, wins: 0 },
    mendigo: { games: 0, wins: 0 },
    assassino: { games: 0, wins: 0 },
    capanga: { games: 0, wins: 0 },
    ladrão: { games: 0, wins: 0 },
    total: { games: 0, wins: 0 }
  }
}
