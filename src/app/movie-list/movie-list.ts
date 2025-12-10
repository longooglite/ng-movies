import { ChangeDetectionStrategy, Component, computed, inject, OnInit, Signal, signal } from '@angular/core'
import { MoviesService } from '../../services/MoviesService'
import { Movie } from '../../types/types'
import { MovieListEntry } from '../movie-list-entry/movie-list-entry'

@Component({
  selector: 'app-movie-list',
  imports: [MovieListEntry],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieList implements OnInit {
  private moviesService = inject(MoviesService)
  movies = signal<Movie[]>([])
  movieTitles = computed(() => this.movies().map((movie) => movie.title))
  moviesLoading = signal(true)
  ngOnInit(): void {
    this.moviesService.moviesLoading$.subscribe((loading) => {
      this.moviesLoading.set(loading)
    })
    this.moviesService.filteredMovies$.subscribe((moviesData) => {
      this.movies.set(moviesData)
    })
  }
  getMovies(): Movie[] {
    return this.movies()
  }
}
