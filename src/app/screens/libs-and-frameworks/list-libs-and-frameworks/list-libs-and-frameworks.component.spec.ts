import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLibsAndFrameworksComponent } from './list-libs-and-frameworks.component';

describe('ListLibsAndFrameworksComponent', () => {
  let component: ListLibsAndFrameworksComponent;
  let fixture: ComponentFixture<ListLibsAndFrameworksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLibsAndFrameworksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLibsAndFrameworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
