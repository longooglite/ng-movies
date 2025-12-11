import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal } from '@angular/core';
import { ScreenSizeService } from '../../services/ScreenSizeService';
import { ScreenSize, ScreenSizesEnum } from '../../consts/globals'
import { AppIcon } from '../app-icon/app-icon'
import { FilterRow } from '../filter-row/filter-row'

@Component({
  selector: 'app-header',
  imports: [AppIcon, FilterRow],
  templateUrl: './app-header.html',
  styleUrl: './app-header.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  
})
export class AppHeader implements OnInit {
  private screenSizeService = inject(ScreenSizeService)
  screenSize = signal<ScreenSize>(ScreenSizesEnum.DESKTOP)
  
  ngOnInit(): void {
    this.screenSizeService.screenSize$.subscribe((screenSize) => {
      this.screenSize.set(screenSize)
    })
  }
  isMobile = computed(() => this.screenSize() === ScreenSizesEnum.MOBILE)
}
