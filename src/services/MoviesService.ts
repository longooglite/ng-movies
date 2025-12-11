import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Apollo } from 'apollo-angular'
import { LIST_MOVIES_QUERY } from '../queries/listMovies'
import { Filter, FILTER_KEYS, Movie } from '../types/types'
import { numberValidator } from '../utils/validators/numberValidator'
import { stringValidator } from '../utils/validators/stringValidator'
import { multiSelectValidator } from '../utils/validators/mutliselectValidator'
import { booleanValidator } from '../utils/validators/booleanValidator'

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private apollo: Apollo) {
    this.apollo.query({ 
      query: LIST_MOVIES_QUERY,
    }).subscribe((result: any) => {
      const sortedMovies = [...result.data?.movies].sort((a: Movie, b: Movie) => {
        if (a.year === b.year) {
          return (a.director || '').localeCompare(b.director || '')
        }
        return a.year - b.year
      }) as Movie[]
      this.moviesSubject.next(sortedMovies)
      this.moviesLoadingSubject.next(false)
      this.filterMovies()
    })
  }
  private filters = new BehaviorSubject<Filter[]>([
    {
      key: FILTER_KEYS.YEAR,
      type: 'number',
      active: false,
      value: null,
      validator: numberValidator(FILTER_KEYS.YEAR),
    }, {
      key: FILTER_KEYS.TITLE,
      type: 'string',
      active: false,
      value: null,
      validator: stringValidator(FILTER_KEYS.TITLE),
    }, {
      key: FILTER_KEYS.DIRECTOR,
      type: 'string',
      active: false,
      value: null,
      validator: stringValidator(FILTER_KEYS.DIRECTOR),
    }, {
      key: FILTER_KEYS.GENRE,
      type: 'multi select',
      active: false,
      value: null,
      validator: multiSelectValidator(FILTER_KEYS.GENRE),
    }, {
      key: FILTER_KEYS.DECADE,
      type: 'multi select',
      active: false,
      value: null,
      validator: multiSelectValidator(FILTER_KEYS.DECADE),
    }, {
      key: FILTER_KEYS.COUNTRY,
      type: 'multi select',
      active: false,
      value: null,
      validator: multiSelectValidator(FILTER_KEYS.COUNTRY),
    }, {
      key: FILTER_KEYS.FORMAT,
      type: 'string',
      active: false,
      value: null,
      validator: stringValidator(FILTER_KEYS.FORMAT),
    }, {
      key: FILTER_KEYS.WATCHED,
      type: 'boolean',
      active: false,
      value: null,
      validator: booleanValidator(FILTER_KEYS.WATCHED),
    }
  ])
  private moviesSubject = new BehaviorSubject<Movie[]>([])
  private filteredMoviesSubject = new BehaviorSubject<Movie[]>([])
  private moviesLoadingSubject = new BehaviorSubject<boolean>(true)
  movies$ = this.moviesSubject.asObservable()
  filteredMovies$ = this.filteredMoviesSubject.asObservable()
  moviesLoading$ = this.moviesLoadingSubject.asObservable()
  filters$ = this.filters.asObservable()
  updateFilter(filterKey: FILTER_KEYS, value: any) {
    const nextFilters = this.filters.value.map((f) => {
      if (f.key !== filterKey) return f
      if (Array.isArray(value)) {
        if (value.length === 0) {
          return { ...f, value: null, active: false }
        }
        return { ...f, value: value, active: true }
      }
      const active = value !== null
      return { ...f, value: active ? value : null, active }
    })
    this.filters.next(nextFilters)
    this.filterMovies()
  }
  filterMovies() {
    const currentMovies = this.moviesSubject.value
    const filteredMovies = currentMovies.filter((movie) => {
      return this.filters.value.every((filter) => {
        if (!filter.active) return true
        return filter.validator(movie, filter.value)
      })
    })
    this.filteredMoviesSubject.next(filteredMovies)
  }
}