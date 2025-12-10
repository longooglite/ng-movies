import { ChangeDetectionStrategy, Component, computed, inject, OnInit, Signal, signal } from '@angular/core'
import { MoviesService } from '../../services/MoviesService'
import { FILTER_KEYS, Movie } from '../../types/types'
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
  moviesLoading = true
  ngOnInit(): void {
    this.moviesService.filteredMovies$.subscribe((moviesData) => {
      this.movies.set(moviesData)
    })
    this.moviesService.updateFilter(FILTER_KEYS.YEAR, 2000)
  }
  getMovies(): Movie[] {
    return this.movies()
  }
}
