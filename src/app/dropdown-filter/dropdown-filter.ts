import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, Input, OnInit, signal } from '@angular/core'
import { AppIcon } from '../app-icon/app-icon'
import { BooleanFilter } from '../boolean-filter/boolean-filter'
import { Filter, FILTER_KEYS } from '../../types/types'
import { MoviesService } from '../../services/MoviesService'
import { MultiSelectFilter } from '../multi-select-filter/multi-select-filter'

@Component({
  selector: 'app-dropdown-filter',
  imports: [AppIcon, BooleanFilter, MultiSelectFilter],
  templateUrl: './dropdown-filter.html',
  styleUrl: './dropdown-filter.scss',
  inputs: ['filterKey'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DropdownFilter implements OnInit {
  @Input() filterKey!: FILTER_KEYS
  private moviesService = inject(MoviesService)
  protected expanded = signal(false)
  protected filter = signal<Filter | null>(null)
  protected filterValue = signal<any>(null)
  protected filterType = signal<string | null>(null)
  protected filterActive = signal<boolean | null>(false)
  protected filterValueText = computed(() => {
    if (Array.isArray(this.filterValue())) {
      return this.filterValue().join(', ')
    }
    return this.filterValue()
  })
  toggleExpanded() {
    this.expanded.set(!this.expanded())
  }
  ngOnInit(): void {
    this.moviesService.filters$.subscribe((filters) => {
      const filter = filters.find((filter) => filter.key === this.filterKey)
      if (filter) {
        this.filter.set(filter)
        this.filterValue.set(filter.value)
        this.filterType.set(filter.type)
        this.filterActive.set(filter.active)
      }
    })
  }
}
