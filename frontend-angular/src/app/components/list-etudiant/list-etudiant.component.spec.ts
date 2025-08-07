import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEtudiantComponent } from './list-etudiant.component';

describe('ListEtudiantComponent', () => {
  let component: ListEtudiantComponent;
  let fixture: ComponentFixture<ListEtudiantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListEtudiantComponent]
    });
    fixture = TestBed.createComponent(ListEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
