import isValidPlayerNumber from '../helpers/isValidPlayerNumber'

export interface Prep {
  capangas: number,
  policiais: number,
  motoristas: number,
  coringas: number
}

const prepTable: Prep[] = [
  {
    capangas: 1,
    policiais: 1,
    motoristas: 0,
    coringas: 0
  },
  {
    capangas: 1,
    policiais: 1,
    motoristas: 1,
    coringas: 0
  },
  {
    capangas: 2,
    policiais: 1,
    motoristas: 1,
    coringas: 0
  },
  {
    capangas: 3,
    policiais: 1,
    motoristas: 1,
    coringas: 1
  },
  {
    capangas: 4,
    policiais: 1,
    motoristas: 1,
    coringas: 1
  },
  {
    capangas: 4,
    policiais: 2,
    motoristas: 1,
    coringas: 1
  },
  {
    capangas: 4,
    policiais: 2,
    motoristas: 2,
    coringas: 2
  },
  {
    capangas: 5,
    policiais: 2,
    motoristas: 2,
    coringas: 2
  }
]

export default function prep(players: number): Prep {
  if (isValidPlayerNumber(players)) {
    return prepTable[players - 5]
  }
  throw new Error('Tentou começar jogo sem número adequado de jogadores')
}
