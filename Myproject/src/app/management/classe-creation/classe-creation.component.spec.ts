import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseCreationComponent } from './classe-creation.component';

describe('ClasseCreationComponent', () => {
  let component: ClasseCreationComponent;
  let fixture: ComponentFixture<ClasseCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClasseCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasseCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
