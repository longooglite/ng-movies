import { Component, Input, signal } from '@angular/core'
import { Movie } from '../../types/types'

@Component({
  selector: 'app-movie-list-entry',
  imports: [],
  templateUrl: './movie-list-entry.html',
  styleUrl: './movie-list-entry.scss',
  inputs: ['movie'],
})
export class MovieListEntry {
  @Input() movie!: Movie
  expanded = signal(false)
  toggleExpanded() {
    this.expanded.set(!this.expanded())
  }
}
