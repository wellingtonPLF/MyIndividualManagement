import { TestBed } from '@angular/core/testing';

import { OcupacaoService } from './ocupacao.service';

describe('OcupacaoService', () => {
  let service: OcupacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OcupacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
