import { Component } from '@angular/core';
import { StringFilter } from '../string-filter/string-filter'
import { FILTER_KEYS } from '../../types/types'
import { DropdownFilter } from '../dropdown-filter/dropdown-filter'

@Component({
  selector: 'app-filter-row',
  imports: [StringFilter, DropdownFilter],
  templateUrl: './filter-row.html',
  styleUrl: './filter-row.scss',
})
export class FilterRow {
  filterKeys = FILTER_KEYS
}
