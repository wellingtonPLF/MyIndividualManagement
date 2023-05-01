import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseInfoComponent } from './classe-info.component';

describe('ClasseInfoComponent', () => {
  let component: ClasseInfoComponent;
  let fixture: ComponentFixture<ClasseInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClasseInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
