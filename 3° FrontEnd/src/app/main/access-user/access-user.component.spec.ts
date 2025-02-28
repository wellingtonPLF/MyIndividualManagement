import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessUserComponent } from './access-user.component';

describe('AccessUserComponent', () => {
  let component: AccessUserComponent;
  let fixture: ComponentFixture<AccessUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccessUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
