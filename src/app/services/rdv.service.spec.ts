import { TestBed } from '@angular/core/testing';

import { Rdv_Service } from './rdv.service';

describe('Rdv_Service', () => {
  let service: Rdv_Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Rdv_Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
