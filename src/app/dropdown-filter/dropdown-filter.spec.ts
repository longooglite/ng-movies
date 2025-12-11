import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownFilter } from './dropdown-filter';

describe('DropdownFilter', () => {
  let component: DropdownFilter;
  let fixture: ComponentFixture<DropdownFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
