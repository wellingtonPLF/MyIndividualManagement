import { TestBed } from '@angular/core/testing';

import { CasualService } from './casual.service';

describe('CasualService', () => {
  let service: CasualService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CasualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
