import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLessonsComponent } from './register-lessons.component';

describe('RegisterLessonsComponent', () => {
  let component: RegisterLessonsComponent;
  let fixture: ComponentFixture<RegisterLessonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterLessonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
