import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseFilter } from './base-filter';

describe('BaseFilter', () => {
  let component: BaseFilter;
  let fixture: ComponentFixture<BaseFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
