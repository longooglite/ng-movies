import { FILTER_KEYS, Movie } from "../../types/types"

export const numberValidator = (key: FILTER_KEYS) =>
    (movie: Movie, value: number): boolean =>
        Number(movie[key]) === value && value !== null