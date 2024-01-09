import { TestBed } from '@angular/core/testing';

import { FuncShareService } from './func-share.service';

describe('FuncShareService', () => {
  let service: FuncShareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuncShareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
