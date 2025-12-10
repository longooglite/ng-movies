import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'
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
  private filters: Filter[] = [{
      key: FILTER_KEYS.YEAR,
      type: 'number',
      active: false,
      value: null,
      validator: numberValidator(FILTER_KEYS.YEAR),
    }, {
      key: FILTER_KEYS.DIRECTOR,
      type: 'string',
      active: false,
      value: null,
      validator: stringValidator(FILTER_KEYS.DIRECTOR),
    }, {
      key: FILTER_KEYS.TITLE,
      type: 'string',
      active: false,
      value: null,
      validator: stringValidator(FILTER_KEYS.TITLE),
    }, {
      key: FILTER_KEYS.GENRE,
      type: 'multi select',
      active: false,
      value: null,
      validator: multiSelectValidator(FILTER_KEYS.GENRE),
    }, {
      key: FILTER_KEYS.COUNTRY,
      type: 'string',
      active: false,
      value: null,
      validator: stringValidator(FILTER_KEYS.COUNTRY),
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
  ]
  private moviesSubject = new BehaviorSubject<Movie[]>([])
  private filteredMoviesSubject = new BehaviorSubject<Movie[]>([])
  private moviesLoadingSubject = new BehaviorSubject<boolean>(true)
  movies$ = this.moviesSubject.asObservable()
  filteredMovies$ = this.filteredMoviesSubject.asObservable()
  updateFilter(filterKey: FILTER_KEYS, value: any) {
    const filter = this.filters.find((filter) => filter.key === filterKey)
    if (!filter) return
    if (value === null) {
      filter.active = false
      filter.value = null
    } else {
      filter.value = value
      filter.active = true
    }
    this.filterMovies()
  }
  filterMovies() {
    const currentMovies = this.moviesSubject.value
    const filteredMovies = currentMovies.filter((movie) => {
      return this.filters.every((filter) => {
        if (!filter.active) return true
        return filter.validator(movie, filter.value)
      })
    })
    this.filteredMoviesSubject.next(filteredMovies)
  }
}