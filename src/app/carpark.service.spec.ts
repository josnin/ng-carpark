import { TestBed, inject } from '@angular/core/testing';

import { CarparkService } from './carpark.service';

describe('CarparkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarparkService]
    });
  });

  it('should be created', inject([CarparkService], (service: CarparkService) => {
    expect(service).toBeTruthy();
  }));
});
