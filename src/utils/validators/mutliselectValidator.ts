import { Movie, FILTER_KEYS } from '../../types/types'

export const multiSelectValidator =
  (filterKey: FILTER_KEYS) =>
  (movie: Movie, value: (string | number)[]): boolean => {
    if (!movie[filterKey]) return false
    if (Array.isArray(movie[filterKey])) {
      return movie[filterKey].some((value: string) => String(value).includes(String(value)))
    }
    return String(value).toLowerCase().includes(String(movie[filterKey]).toLowerCase())
  }
