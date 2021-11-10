import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcupacaoGeralComponent } from './ocupacao-geral.component';

describe('OcupacaoGeralComponent', () => {
  let component: OcupacaoGeralComponent;
  let fixture: ComponentFixture<OcupacaoGeralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcupacaoGeralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OcupacaoGeralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
