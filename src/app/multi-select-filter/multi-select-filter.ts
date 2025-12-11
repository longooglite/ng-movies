import { Component, computed, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BaseFilter } from '../base-filter/base-filter'
import { Movie } from '../../types/types'
import { AppIcon } from '../app-icon/app-icon'

@Component({
  selector: 'app-multi-select-filter',
  imports: [AppIcon],
  templateUrl: './multi-select-filter.html',
  styleUrl: './multi-select-filter.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MultiSelectFilter extends BaseFilter {
  protected options = computed(() => {
    return Array.from(
        new Set(
          this.movies()
          .map((movie: Movie) => movie[this.filterKey.toLowerCase()])
          .filter(Boolean)
          .map(String)
          .sort((stringA, stringB) => stringA.localeCompare(stringB))
        )
    ) as string[] })
  getIcon(value: string) {
    const currentValue = this.filter()?.value as string[]
    return currentValue?.includes(String(value)) ? 'mdi:minus' : 'mdi:plus'
  }
  updateFilterValue(value: string) {
    const currentValue = this.filter()?.value
    if (Array.isArray(currentValue)) {
      if (currentValue.includes(String(value))) {
        this.moviesService.updateFilter(this.filterKey, currentValue.filter((v: string) => v !== value))
      } else {
        this.moviesService.updateFilter(this.filterKey, [...currentValue, value])
      }
    } else {
      this.moviesService.updateFilter(this.filterKey, [value])
    }

  }
}