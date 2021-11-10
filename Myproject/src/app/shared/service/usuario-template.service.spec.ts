import { TestBed } from '@angular/core/testing';

import { UsuarioTemplateService } from './usuario-template.service';

describe('UsuarioTemplateService', () => {
  let service: UsuarioTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
