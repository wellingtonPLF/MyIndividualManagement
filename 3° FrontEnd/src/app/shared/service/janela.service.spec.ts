import { TestBed } from '@angular/core/testing';

import { JanelaService } from './janela.service';

describe('JanelaService', () => {
  let service: JanelaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JanelaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
