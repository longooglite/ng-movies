import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListEntry } from './movie-list-entry';

describe('MovieListEntry', () => {
  let component: MovieListEntry;
  let fixture: ComponentFixture<MovieListEntry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieListEntry]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieListEntry);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
