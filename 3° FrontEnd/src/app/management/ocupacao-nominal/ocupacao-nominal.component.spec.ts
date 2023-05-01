import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcupacaoNominalComponent } from './ocupacao-nominal.component';

describe('OcupacaoNominalComponent', () => {
  let component: OcupacaoNominalComponent;
  let fixture: ComponentFixture<OcupacaoNominalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcupacaoNominalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OcupacaoNominalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
