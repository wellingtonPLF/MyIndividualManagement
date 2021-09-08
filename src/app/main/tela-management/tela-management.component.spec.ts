import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaManagementComponent } from './tela-management.component';

describe('TelaManagementComponent', () => {
  let component: TelaManagementComponent;
  let fixture: ComponentFixture<TelaManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
