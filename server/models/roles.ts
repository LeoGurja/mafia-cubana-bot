enum Roles {
  Chefe,
  Policial,
  Motorista,
  Mendigo,
  Assassino,
  Capanga,
  Ladrao
}

export type Role = 'chefe' |
  'policial' |
  'motorista' |
  'mendigo' |
  'assassino' |
  'capanga' |
  'ladrão'

export const roles: Role[] = [
  'chefe',
  'policial',
  'motorista',
  'mendigo',
  'assassino',
  'capanga',
  'ladrão'
]

export function roleToString(role: Roles): string {
  return roles[role]
}

export default Roles
