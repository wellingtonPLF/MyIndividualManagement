import { TestBed } from '@angular/core/testing';

import { ValidateEmailService } from './validate-email.service';

describe('ValidateEmailService', () => {
  let service: ValidateEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
