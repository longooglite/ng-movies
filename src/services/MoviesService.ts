import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { Apollo } from 'apollo-angular'
import { LIST_MOVIES_QUERY } from '../queries/listMovies'
import { Movie } from '../types/types'

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private moviesSubject = new Subject<Movie[]>()
  movies$ = this.moviesSubject.asObservable()

  constructor(private apollo: Apollo) {
    this.apollo.query({ 
      query: LIST_MOVIES_QUERY,
    }).subscribe((result: any) => {
      console.log(result)
      this.moviesSubject.next(result.data?.movies as Movie[])
    })
  }
}