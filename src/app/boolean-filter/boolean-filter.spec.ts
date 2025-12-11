import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanFilter } from './boolean-filter';

describe('BooleanFilter', () => {
  let component: BooleanFilter;
  let fixture: ComponentFixture<BooleanFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooleanFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooleanFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
