// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ClasseService } from 'src/app/services/classe.service';
// import { Classe } from 'src/app/models/classe'; // adapte selon ton modèle
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-list-classe',
//   templateUrl: './list-classe.component.html',
//   styleUrls: ['./list-classe.component.css'],
// })
// export class ListClasseComponent implements OnInit {
//   classes: Classe[] = [];
//   classeForm!: FormGroup;
//   classeSelectionnee: Classe | null = null;
//   modeModification: boolean = false;

//   constructor(private fb: FormBuilder, private classeService: ClasseService, private router: Router) {}

//   ngOnInit(): void {
//     this.initForm();
//     this.chargerClasses();
//   }

//   initForm(): void {
//     this.classeForm = this.fb.group({
//       libelle: ['', Validators.required],
//       niveau: ['', Validators.required],
//       specialite: ['', Validators.required],
//       departement: ['', Validators.required],
//     });
//   }

//   chargerClasses(): void {
//     this.classeService.listerClasses().subscribe({
//       next: (data) => (this.classes = data),
//       error: (err) => console.error('Erreur chargement classes:', err),
//     });
//   }

//   ouvrirModal(edition: boolean = false, classe?: Classe): void {
//     const modal = document.getElementById('ajouterClasseModal');
//     if (!modal) return;

//     this.modeModification = edition;

//     if (edition && classe) {
//       this.classeSelectionnee = classe;
//       this.classeForm.patchValue(classe);
//     } else {
//       this.classeSelectionnee = null;
//       this.classeForm.reset();
//     }
//     modal.classList.remove('hidden');
//   }

//   fermerModal(): void {
//     const modal = document.getElementById('ajouterClasseModal');
//     if (modal) modal.classList.add('hidden');

//     this.classeForm.reset();
//     this.classeSelectionnee = null;
//     this.modeModification = false;
//   }

//   onSubmit(): void {
//     if (this.classeForm.invalid) return;

//     const formValue = this.classeForm.value;

//     if (this.modeModification && this.classeSelectionnee) {
//       // Modifier
//       this.classeService.modifierClasse(this.classeSelectionnee.id!, formValue).subscribe({
//         next: () => {
//           console.log('Classe modifiée');
//           this.fermerModal();
//           this.chargerClasses();
//         },
//         error: (err) => console.error('Erreur modification:', err),
//       });
//     } else {
//       // Ajouter
//       this.classeService.ajouterClasse(formValue).subscribe({
//         next: () => {
//           console.log('Classe ajoutée');
//           this.fermerModal();
//           this.chargerClasses();
//         },
//         error: (err) => console.error('Erreur ajout:', err),
//       });
//     }
//   }

//   supprimer(id: string): void {
//     if (confirm('Voulez-vous vraiment supprimer cette classe ?')) {
//       this.classeService.supprimerClasse(id).subscribe({
//         next: () => {
//           console.log('Classe supprimée');
//           this.chargerClasses();
//         },
//         error: (err) => console.error('Erreur suppression:', err),
//       });
//     }
//   }

//   details(id: string): void {
//     this.router.navigate(['/classe', id, 'etudiants']);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClasseService } from 'src/app/services/classe.service';
import { Classe } from 'src/app/models/classe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-classe',
  templateUrl: './list-classe.component.html',
  styleUrls: ['./list-classe.component.css'],
})
export class ListClasseComponent implements OnInit {
  classes: Classe[] = [];
  classesFiltrees: Classe[] = [];

  // Formulaire réactif
  classeForm!: FormGroup;
  classeSelectionnee: Classe | null = null;
  modeModification: boolean = false;

  // Recherche / filtre
  searchTerm: string = '';
  filtreNiveau: string = '';
  niveauxDisponibles: string[] = [];

  constructor(
    private fb: FormBuilder,
    private classeService: ClasseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.chargerClasses();
  }

  initForm(): void {
    this.classeForm = this.fb.group({
      libelle: ['', Validators.required],
      niveau: ['', Validators.required],
      specialite: ['', Validators.required],
      departement: ['', Validators.required],
    });
  }

  chargerClasses(): void {
    this.classeService.listerClasses().subscribe({
      next: (data: Classe[]) => {
        this.classes = data || [];
        this.classesFiltrees = [...this.classes];
        // calculer niveaux uniques pour le filtre
        this.niveauxDisponibles = Array.from(new Set(this.classes.map(c => c.niveau))).filter(Boolean);
      },
      error: (err) => {
        console.error('Erreur chargement classes:', err);
        this.classes = [];
        this.classesFiltrees = [];
      },
    });
  }

  ouvrirModal(edition: boolean = false, classe?: Classe): void {
    const modal = document.getElementById('ajouterClasseModal');
    if (!modal) return;

    this.modeModification = edition;

    if (edition && classe) {
      this.classeSelectionnee = classe;
      // patchValue utile pour garder l'id (non présent dans le form)
      this.classeForm.patchValue({
        libelle: classe.libelle,
        niveau: classe.niveau,
        specialite: classe.specialite,
        departement: classe.departement,
      });
    } else {
      this.classeSelectionnee = null;
      this.classeForm.reset();
    }

    modal.classList.remove('hidden');
  }

  fermerModal(): void {
    const modal = document.getElementById('ajouterClasseModal');
    if (modal) modal.classList.add('hidden');

    this.classeForm.reset();
    this.classeSelectionnee = null;
    this.modeModification = false;
  }

  onSubmit(): void {
    if (this.classeForm.invalid) {
      this.classeForm.markAllAsTouched();
      return;
    }

    const formValue = this.classeForm.value;

    if (this.modeModification && this.classeSelectionnee && this.classeSelectionnee.id) {
      this.classeService.modifierClasse(this.classeSelectionnee.id, formValue).subscribe({
        next: () => {
          this.fermerModal();
          this.chargerClasses();
        },
        error: (err) => console.error('Erreur modification:', err),
      });
    } else {
      this.classeService.ajouterClasse(formValue).subscribe({
        next: () => {
          this.fermerModal();
          this.chargerClasses();
        },
        error: (err) => console.error('Erreur ajout:', err),
      });
    }
  }

  supprimer(id: string): void {
    if (!id) return;
    if (confirm('Voulez-vous vraiment supprimer cette classe ?')) {
      this.classeService.supprimerClasse(id).subscribe({
        next: () => this.chargerClasses(),
        error: (err) => console.error('Erreur suppression:', err),
      });
    }
  }

  details(id: string): void {
    if (!id) return;
    this.router.navigate(['/classe', id, 'etudiants']);
  }

  filtrerClasses(): void {
    const term = this.searchTerm.trim().toLowerCase();

    this.classesFiltrees = this.classes.filter(c => {
      const matcheRecherche =
        !term ||
        (c.libelle && c.libelle.toLowerCase().includes(term)) ||
        (c.specialite && c.specialite.toLowerCase().includes(term)) ||
        (c.departement && c.departement.toLowerCase().includes(term));

      const matcheNiveau = !this.filtreNiveau || c.niveau === this.filtreNiveau;

      return matcheRecherche && matcheNiveau;
    });
  }

  // Getter methods for form controls - SOLUTION 1
  get libelleControl() {
    return this.classeForm.get('libelle');
  }

  get niveauControl() {
    return this.classeForm.get('niveau');
  }

  get specialiteControl() {
    return this.classeForm.get('specialite');
  }

  get departementControl() {
    return this.classeForm.get('departement');
  }
}