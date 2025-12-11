import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  imports: [],
  templateUrl: './app-icon.html',
  styleUrl: './app-icon.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  inputs: ['icon'],
})
export class AppIcon {
  @Input() icon!: string
  @Input() width: number = 24
  @Input() height: number = 24
}
