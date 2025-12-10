import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { MovieList } from './movie-list/movie-list'
import { AppHeader } from './app-header/app-header'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MovieList, AppHeader],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class App {
  protected readonly title = signal('ng-movies')
}
