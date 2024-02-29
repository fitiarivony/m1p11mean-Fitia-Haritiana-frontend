import { TestBed } from '@angular/core/testing';

import { DepenseService } from './depense.service';

describe('DepenseService', () => {
  let service: DepenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepenseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
