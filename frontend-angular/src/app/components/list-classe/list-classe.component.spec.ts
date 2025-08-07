import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClasseComponent } from './list-classe.component';

describe('ListClasseComponent', () => {
  let component: ListClasseComponent;
  let fixture: ComponentFixture<ListClasseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListClasseComponent]
    });
    fixture = TestBed.createComponent(ListClasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
