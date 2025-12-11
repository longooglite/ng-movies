import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core'
import { MovieList } from './movie-list/movie-list'
import { AppHeader } from './app-header/app-header'
import { FilterRow } from './filter-row/filter-row'

@Component({
  selector: 'app-root',
  imports: [MovieList, AppHeader, FilterRow],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class App {
  protected readonly title = signal('ng-movies')
}
