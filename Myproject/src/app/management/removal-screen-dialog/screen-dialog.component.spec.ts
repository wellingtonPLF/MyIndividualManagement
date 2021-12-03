import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovalScreenDialogComponent } from './removal-screen-dialog.component';

describe('ScreenDialogComponent', () => {
  let component: RemovalScreenDialogComponent;
  let fixture: ComponentFixture<RemovalScreenDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemovalScreenDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovalScreenDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
