import { TestBed } from '@angular/core/testing';

import { CalcularAcarreoService } from './calcular-acarreo.service';

describe('CalcularAcarreoService', () => {
  let service: CalcularAcarreoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalcularAcarreoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
