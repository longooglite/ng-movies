import { Movie, FILTER_KEYS } from '../../types/types'

export const multiSelectValidator =
  (filterKey: FILTER_KEYS) =>
  (movie: Movie, value: (string | number)[]): boolean => {
    if (!movie[filterKey]) return false
    if (Array.isArray(movie[filterKey])) {
      return movie[filterKey].some((genre: string) => value.includes(genre))
    }
    return value.includes(movie[filterKey] as string | number)
  }
