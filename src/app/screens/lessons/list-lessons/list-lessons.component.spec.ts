import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLessonsComponent } from './list-lessons.component';

describe('ListLessonsComponent', () => {
  let component: ListLessonsComponent;
  let fixture: ComponentFixture<ListLessonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLessonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
