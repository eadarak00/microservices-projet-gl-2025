import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEtudiantClasseComponent } from './list-etudiant-classe.component';

describe('ListEtudiantClasseComponent', () => {
  let component: ListEtudiantClasseComponent;
  let fixture: ComponentFixture<ListEtudiantClasseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListEtudiantClasseComponent]
    });
    fixture = TestBed.createComponent(ListEtudiantClasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
