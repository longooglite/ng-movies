import { FILTER_KEYS, Movie } from "../../types/types"
export const booleanValidator = (key: FILTER_KEYS) =>
    (movie: Movie, value: boolean): boolean =>
        movie[key] === value && value !== null