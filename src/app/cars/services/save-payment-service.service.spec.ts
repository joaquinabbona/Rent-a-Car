import { TestBed } from '@angular/core/testing';

import { SavePaymentServiceService } from './save-payment-service.service';

describe('SavePaymentServiceService', () => {
  let service: SavePaymentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavePaymentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
