import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndisponivelComponent } from './indisponivel.component';

describe('IndisponivelComponent', () => {
  let component: IndisponivelComponent;
  let fixture: ComponentFixture<IndisponivelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndisponivelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndisponivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
