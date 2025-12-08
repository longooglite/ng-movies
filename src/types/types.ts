export interface Movie {
  [key: string]: string | number | boolean | string[] | undefined
  id: string
  title: string
  year: number
  director: string
  decade?: string
  country?: string
  genre?: string[] | string
  watched?: boolean
  format?: string
  label?: string
  tmdbId?: string
  tmdbPosterPath?: string
  description?: string
}
export enum FILTER_KEYS {
  YEAR = 'year',
  DECADE = 'decade',
  COUNTRY = 'country',
  GENRE = 'genre',
  WATCHED = 'watched',
  DIRECTOR = 'director',
  TITLE = 'title',
  FORMAT = 'format',
}
export interface Filter {
  key: FILTER_KEYS
  type: 'number' | 'single select' | 'multi select' | 'boolean' | 'string'
  active: boolean
  value: number | string | string[] | boolean | null
  validator: (Movie: Movie, value: any) => boolean
}
