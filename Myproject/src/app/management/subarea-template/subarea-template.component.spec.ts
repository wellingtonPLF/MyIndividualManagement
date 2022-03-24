import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubareaTemplateComponent } from './subarea-template.component';

describe('SubareaTemplateComponent', () => {
  let component: SubareaTemplateComponent;
  let fixture: ComponentFixture<SubareaTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubareaTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubareaTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
