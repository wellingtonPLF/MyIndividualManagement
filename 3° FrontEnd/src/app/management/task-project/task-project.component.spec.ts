import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskProjectComponent } from './task-project.component';

describe('TaskProjectComponent', () => {
  let component: TaskProjectComponent;
  let fixture: ComponentFixture<TaskProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
