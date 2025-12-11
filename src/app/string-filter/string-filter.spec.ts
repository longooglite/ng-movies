import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StringFilter } from './string-filter';

describe('StringFilter', () => {
  let component: StringFilter;
  let fixture: ComponentFixture<StringFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StringFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StringFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
