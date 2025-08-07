// // import { Component, OnInit } from '@angular/core';
// // import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// // import { ClasseService } from 'src/app/services/classe.service';

// // @Component({
// //   selector: 'app-list-classe',
// //   templateUrl: './list-classe.component.html',
// //   styleUrls: ['./list-classe.component.css'],
// // })
// // export class ListClasseComponent implements OnInit {
// //   classes: any[] = [];
// //   classeForm!: FormGroup;

// //   constructor(private fb: FormBuilder, private classeService: ClasseService) {}

// //   ngOnInit(): void {
// //     this.initForm();
// //     this.chargerClasses();
// //   }

// //   initForm() {
// //     this.classeForm = this.fb.group({
// //       libelle: ['', Validators.required],
// //       niveau: ['', Validators.required],
// //       specialite: ['', Validators.required],
// //       departement: ['', Validators.required],
// //     });
// //   }

// //   ouvrirModal(): void {
// //     const modal = document.getElementById('ajouterClasseModal');
// //     if (modal) modal.classList.remove('hidden');
// //   }

// //   fermerModal(): void {
// //     const modal = document.getElementById('ajouterClasseModal');
// //     if (modal) modal.classList.add('hidden');
// //   }

// //   chargerClasses(): void {
// //     this.classeService.listerClasses().subscribe({
// //       next: (data) => {
// //         this.classes = data;
// //       },
// //       error: (err) => {
// //         console.error('Erreur lors du chargement des classes:', err);
// //       },
// //     });
// //   }

// //   onSubmit(): void {
// //     if (this.classeForm.invalid) return;

// //     this.classeService.ajouterClasse(this.classeForm.value).subscribe({
// //       next: (response) => {
// //         console.log('Classe ajoutée:', response);
// //         this.fermerModal();
// //         this.classeForm.reset();
// //         this.chargerClasses();
// //       },
     
// //       error: (err) => {
// //         console.error('Erreur ajout classe', err);
// //       }
// //     });
// //   }
// // }



// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ClasseService } from 'src/app/services/classe.service';

// @Component({
//   selector: 'app-list-classe',
//   templateUrl: './list-classe.component.html',
//   styleUrls: ['./list-classe.component.css']
// })
// export class ListClasseComponent implements OnInit {
//   classes: any[] = [];
//   classeForm!: FormGroup;
//   classeSelectionnee: any = null;

//   constructor(private fb: FormBuilder, private classeService: ClasseService) {}

//   ngOnInit(): void {
//     this.initForm();

//     // S'abonner à la liste des classes automatiquement
//     this.classeService.classes$.subscribe((data) => {
//       this.classes = data;
//     });
//   }

//   initForm(): void {
//     this.classeForm = this.fb.group({
//       libelle: ['', Validators.required],
//       niveau: ['', Validators.required],
//       specialite: ['', Validators.required],
//       departement: ['', Validators.required]
//     });
//   }

//   ouvrirModal(edition: boolean = false, classe: any = null): void {
//     const modal = document.getElementById('ajouterClasseModal');
//     if (modal) modal.classList.remove('hidden');

//     if (edition && classe) {
//       this.classeSelectionnee = classe;
//       this.classeForm.patchValue(classe);
//     } else {
//       this.classeSelectionnee = null;
//       this.classeForm.reset();
//     }
//   }

//   fermerModal(): void {
//     const modal = document.getElementById('ajouterClasseModal');
//     if (modal) modal.classList.add('hidden');
//     this.classeForm.reset();
//     this.classeSelectionnee = null;
//   }

//   onSubmit(): void {
//     if (this.classeForm.invalid) return;

//     const formValue = this.classeForm.value;

//     if (this.classeSelectionnee) {
//       // Modifier
//       this.classeService.modifierClasse(this.classeSelectionnee.id, formValue).subscribe(() => {
//         this.fermerModal();
//       });
//     } else {
//       // Ajouter
//       this.classeService.ajouterClasse(formValue).subscribe(() => {
//         this.fermerModal();
//       });
//     }
//   }

//   supprimer(id: string): void {
//     if (confirm('Voulez-vous vraiment supprimer cette classe ?')) {
//       this.classeService.supprimerClasse(id).subscribe();
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClasseService } from 'src/app/services/classe.service';
import { Classe } from 'src/app/models/classe'; // adapte selon ton modèle
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-classe',
  templateUrl: './list-classe.component.html',
  styleUrls: ['./list-classe.component.css'],
})
export class ListClasseComponent implements OnInit {
  classes: Classe[] = [];
  classeForm!: FormGroup;
  classeSelectionnee: Classe | null = null;
  modeModification: boolean = false;

  constructor(private fb: FormBuilder, private classeService: ClasseService, private router: Router) {}

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
      next: (data) => (this.classes = data),
      error: (err) => console.error('Erreur chargement classes:', err),
    });
  }

  ouvrirModal(edition: boolean = false, classe?: Classe): void {
    const modal = document.getElementById('ajouterClasseModal');
    if (!modal) return;

    this.modeModification = edition;

    if (edition && classe) {
      this.classeSelectionnee = classe;
      this.classeForm.patchValue(classe);
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
    if (this.classeForm.invalid) return;

    const formValue = this.classeForm.value;

    if (this.modeModification && this.classeSelectionnee) {
      // Modifier
      this.classeService.modifierClasse(this.classeSelectionnee.id!, formValue).subscribe({
        next: () => {
          console.log('Classe modifiée');
          this.fermerModal();
          this.chargerClasses();
        },
        error: (err) => console.error('Erreur modification:', err),
      });
    } else {
      // Ajouter
      this.classeService.ajouterClasse(formValue).subscribe({
        next: () => {
          console.log('Classe ajoutée');
          this.fermerModal();
          this.chargerClasses();
        },
        error: (err) => console.error('Erreur ajout:', err),
      });
    }
  }

  supprimer(id: string): void {
    if (confirm('Voulez-vous vraiment supprimer cette classe ?')) {
      this.classeService.supprimerClasse(id).subscribe({
        next: () => {
          console.log('Classe supprimée');
          this.chargerClasses();
        },
        error: (err) => console.error('Erreur suppression:', err),
      });
    }
  }

  details(id: string): void {
    this.router.navigate(['/classe', id, 'etudiants']);
  }
}

