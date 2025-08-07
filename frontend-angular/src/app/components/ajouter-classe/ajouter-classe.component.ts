import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClasseService } from 'src/app/services/classe.service';

@Component({
  selector: 'app-ajouter-classe',
  templateUrl: './ajouter-classe.component.html',
  styleUrls: ['./ajouter-classe.component.css']
})
export class AjouterClasseComponent implements OnInit {
  classeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private classeService: ClasseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.classeForm = this.fb.group({
      libelle: ['', Validators.required],
      niveau: ['', Validators.required],
      specialite: ['', Validators.required],
      departement: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.classeForm.valid) {
      this.classeService.ajouterClasse(this.classeForm.value).subscribe({
        next: (response) => {
          console.log('Création réussie :', response);
          this.router.navigate(['/classes']);
        },
        error: (err) => {
          console.error('Erreur lors de la création :', err);
        }
      });
    } else {
      console.warn('Formulaire invalide');
    }
  }
}
