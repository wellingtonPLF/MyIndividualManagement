import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcupacaoListComponent } from './ocupacao-list.component';

describe('OcupacaoListComponent', () => {
  let component: OcupacaoListComponent;
  let fixture: ComponentFixture<OcupacaoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcupacaoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OcupacaoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
