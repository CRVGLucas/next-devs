import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLibsAndFrameworksComponent } from './register-libs-and-frameworks.component';

describe('RegisterLibsAndFrameworksComponent', () => {
  let component: RegisterLibsAndFrameworksComponent;
  let fixture: ComponentFixture<RegisterLibsAndFrameworksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterLibsAndFrameworksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterLibsAndFrameworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
