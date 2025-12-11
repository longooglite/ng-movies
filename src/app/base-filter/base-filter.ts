import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, Input, OnInit, signal } from '@angular/core';
import { Filter, FILTER_KEYS, Movie } from '../../types/types'
import { MoviesService } from '../../services/MoviesService'

@Component({
  selector: 'app-base-filter',
  templateUrl: './base-filter.html',
  styleUrl: './base-filter.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  inputs: ['filterKey'],
})
export class BaseFilter implements OnInit {
  @Input() filterKey!: FILTER_KEYS
  protected moviesService = inject(MoviesService)
  protected movies = signal<Movie[]>([])
  protected filter = signal<Filter | null>(null)
  ngOnInit(): void {
    this.moviesService.movies$.subscribe((movies) => {
      this.movies.set(movies)
    })
    this.moviesService.filters$.subscribe((filters) => {
      this.filter.set(filters.find((f: Filter) => f.key === this.filterKey) || null)
    })
  }
}
