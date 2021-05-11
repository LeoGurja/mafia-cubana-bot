
export type ValidPlayerNumber = 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export default function isValidPlayerNumber(players: number): players is ValidPlayerNumber {
  return players >= 5 && players <= 12
}
