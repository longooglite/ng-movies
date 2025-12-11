import { FILTER_KEYS } from "../../types/types"
import { Movie } from "../../types/types"
export const stringValidator = (key: FILTER_KEYS) => 
    (movie: Movie, value: string) => {
        return String(movie[key]).toLowerCase().includes(value.toLowerCase())
    }