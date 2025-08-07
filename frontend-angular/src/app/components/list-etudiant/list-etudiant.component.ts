import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EtudiantService } from 'src/app/services/etudiant.service';
import { ClasseService } from 'src/app/services/classe.service';
import { Etudiant } from 'src/app/models/etudiant';
import { Classe } from 'src/app/models/classe';

@Component({
  selector: 'app-list-etudiant',
  templateUrl: './list-etudiant.component.html',
  styleUrls: ['./list-etudiant.component.css'],
})
export class ListEtudiantComponent implements OnInit {
  etudiants: Etudiant[] = [];
  classes: Classe[] = [];

  etudiantForm!: FormGroup;
  etudiantSelectionne: Etudiant | null = null;
  modeModification = false;

  constructor(
    private fb: FormBuilder,
    private etudiantService: EtudiantService,
    private classeService: ClasseService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.chargerClasses();
    this.chargerEtudiants();
  }

  initForm(): void {
    this.etudiantForm = this.fb.group({
      matricule: [''],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: [''],
      adresse: [''],
      classeId: ['', Validators.required],
    });
  }

  chargerClasses(): void {
    this.classeService.listerClasses().subscribe({
      next: (data) => (this.classes = data),
      error: (err) => console.error('Erreur chargement classes:', err),
    });
  }

  chargerEtudiants(): void {
    this.etudiantService.listerEtudiants().subscribe({
      next: (data) => (this.etudiants = data),
      error: (err) => console.error('Erreur chargement étudiants:', err),
    });
  }

  ouvrirModal(edition: boolean = false, etudiant?: Etudiant): void {
    const modal = document.getElementById('etudiantModal');
    if (!modal) return;

    this.modeModification = edition;

    if (edition && etudiant) {
      this.etudiantSelectionne = etudiant;
      this.etudiantForm.patchValue(etudiant);
    } else {
      this.etudiantSelectionne = null;
      this.etudiantForm.reset();
    }

    modal.classList.remove('hidden');
  }

  fermerModal(): void {
    const modal = document.getElementById('etudiantModal');
    if (modal) modal.classList.add('hidden');

    this.etudiantForm.reset();
    this.etudiantSelectionne = null;
    this.modeModification = false;
  }

  onSubmit(): void {
    if (this.etudiantForm.invalid) {
      this.etudiantForm.markAllAsTouched();
      return;
    }

    const formValue = this.etudiantForm.value;

    if (this.modeModification && this.etudiantSelectionne) {
      // Modification
      this.etudiantService
        .modifierEtudiant(this.etudiantSelectionne.id!, formValue)
        .subscribe({
          next: () => {
            console.log('Étudiant modifié');
            this.fermerModal();
            this.chargerEtudiants();
          },
          error: (err) => console.error('Erreur modification:', err),
        });
    } else {
      // Ajout
      this.etudiantService.ajouterEtudiant(formValue).subscribe({
        next: () => {
          console.log('Étudiant ajouté');
          this.fermerModal();
          this.chargerEtudiants();
        },
        error: (err) => console.error('Erreur ajout:', err),
      });
    }
  }

  supprimer(id: string): void {
    if (confirm('Voulez-vous vraiment supprimer cet étudiant ?')) {
      this.etudiantService.supprimerEtudiant(id).subscribe({
        next: () => {
          console.log('Étudiant supprimé');
          this.chargerEtudiants();
        },
        error: (err) => console.error('Erreur suppression:', err),
      });
    }
  }
}
