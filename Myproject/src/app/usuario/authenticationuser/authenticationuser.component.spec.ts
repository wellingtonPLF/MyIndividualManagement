import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationuserComponent } from './authenticationuser.component';

describe('AuthenticationuserComponent', () => {
  let component: AuthenticationuserComponent;
  let fixture: ComponentFixture<AuthenticationuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticationuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
