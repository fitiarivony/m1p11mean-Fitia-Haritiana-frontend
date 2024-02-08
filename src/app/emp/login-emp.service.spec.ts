import { TestBed } from '@angular/core/testing';

import { LoginEmpService } from './login-emp.service';

describe('LoginEmpService', () => {
  let service: LoginEmpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginEmpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
