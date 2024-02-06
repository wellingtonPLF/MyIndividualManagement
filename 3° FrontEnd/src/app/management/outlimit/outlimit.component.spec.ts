import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutlimitComponent } from './outlimit.component';

describe('OutlimitComponent', () => {
  let component: OutlimitComponent;
  let fixture: ComponentFixture<OutlimitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutlimitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutlimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
