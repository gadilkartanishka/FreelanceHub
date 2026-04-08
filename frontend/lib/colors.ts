export const colors = {
  navy:   '#22223B',
  indigo: '#4A4E69',
  mauve:  '#9A8C98',
  rose:   '#C9ADA7',
  cream:  '#F2E9E4',
} as const

export type ColorKey = keyof typeof colors