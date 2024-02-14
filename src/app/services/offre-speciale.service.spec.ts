import { TestBed } from '@angular/core/testing';

import { OffreSpecialeService } from './offre-speciale.service';

describe('OffreSpecialeService', () => {
  let service: OffreSpecialeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffreSpecialeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
