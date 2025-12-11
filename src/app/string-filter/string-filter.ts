import { Component, computed, signal } from '@angular/core';
import { BaseFilter } from '../base-filter/base-filter'

@Component({
  selector: 'app-string-filter',
  imports: [],
  templateUrl: './string-filter.html',
  styleUrl: './string-filter.scss',
  inputs: ['filterKey'],
  standalone: true,
})
export class StringFilter extends BaseFilter {
  protected filterValue = signal<string | null>(null)
  protected placeholder = computed(() => {
    return this.filterKey.charAt(0).toUpperCase() + this.filterKey.slice(1)
  })
  updateFilterValue(value: string) {
    this.filterValue.set(value)
    this.moviesService.updateFilter(this.filterKey, value)
  }
}
