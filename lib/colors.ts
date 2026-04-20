export const colors = {
  navy:   '#0F172A', // Slate 900 (Sticking to dark for structure)
  indigo: '#334155', // Slate 700
  mauve:  '#64748B', // Slate 500
  rose:   '#8F2D56', // Plum (Primary Accent)
  gold:   '#FFBC42', // Saffron (Important highlight)
  ruby:   '#D81159', // Ruby (Secondary)
} as const

export type ColorKey = keyof typeof colors