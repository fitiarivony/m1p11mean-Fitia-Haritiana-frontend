import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginEmpComponent } from './login-emp.component';

describe('LoginEmpComponent', () => {
  let component: LoginEmpComponent;
  let fixture: ComponentFixture<LoginEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginEmpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
