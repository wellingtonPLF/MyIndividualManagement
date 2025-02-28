import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { experienceGuard } from './experience.guard';

describe('experienceGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => experienceGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
