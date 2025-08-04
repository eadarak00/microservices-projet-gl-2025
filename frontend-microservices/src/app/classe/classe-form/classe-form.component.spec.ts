import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseFormComponent } from './classe-form.component';

describe('ClasseFormComponent', () => {
  let component: ClasseFormComponent;
  let fixture: ComponentFixture<ClasseFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClasseFormComponent]
    });
    fixture = TestBed.createComponent(ClasseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
