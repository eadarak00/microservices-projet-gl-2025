import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseListComponent } from './classe-list.component';

describe('ClasseListComponent', () => {
  let component: ClasseListComponent;
  let fixture: ComponentFixture<ClasseListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClasseListComponent]
    });
    fixture = TestBed.createComponent(ClasseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
