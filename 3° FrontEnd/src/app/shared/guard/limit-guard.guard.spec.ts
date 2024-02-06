import { TestBed } from '@angular/core/testing';

import { LimitGuardGuard } from './limit-guard.guard';

describe('LimitGuardGuard', () => {
  let guard: LimitGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LimitGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
