import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThoseSubareasComponent } from './those-subareas.component';

describe('ThoseSubareasComponent', () => {
  let component: ThoseSubareasComponent;
  let fixture: ComponentFixture<ThoseSubareasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThoseSubareasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThoseSubareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
