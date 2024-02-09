import { TestBed } from '@angular/core/testing';

import { ServeService } from './serve.service';

describe('ServeService', () => {
  let service: ServeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
