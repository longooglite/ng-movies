import { Component, CUSTOM_ELEMENTS_SCHEMA, HostBinding, inject, Input, signal } from '@angular/core';
import { FILTER_KEYS } from '../../types/types'
import { MoviesService } from '../../services/MoviesService'
import { AppIcon } from '../app-icon/app-icon'
import { BaseFilter } from '../base-filter/base-filter'

@Component({
  selector: 'app-boolean-filter',
  imports: [AppIcon],
  templateUrl: './boolean-filter.html',
  styleUrl: './boolean-filter.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  inputs: ['filterKey', 'layout', 'labels'],
  host: {
    '[class.horizontal]': 'layout === "horizontal"',
    '[class.vertical]': 'layout !== "horizontal"',
  },
})
export class BooleanFilter extends BaseFilter {
  @Input() layout: 'horizontal' | 'vertical' = 'vertical'
  @Input() labels: { true?: string, null?: string, false?: string } = { true: 'Yes', null: 'Unset', false: 'No' }
  protected filterValue = signal<boolean | null>(null)
  updateFilterValue(value: boolean | null) {
    this.filterValue.set(value)
    this.moviesService.updateFilter(this.filterKey, value)
  }
}
