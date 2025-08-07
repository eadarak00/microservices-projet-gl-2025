import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Etudiant } from 'src/app/models/etudiant';
import { Classe } from 'src/app/models/classe';
import { ClasseService } from 'src/app/services/classe.service';

@Component({
  selector: 'app-list-etudiant-classe',
  templateUrl: './list-etudiant-classe.component.html',
  styleUrls: ['./list-etudiant-classe.component.css']
})
export class ListEtudiantClasseComponent implements OnInit {
  etudiants: Etudiant[] = [];
  classeId!: string;
  classeNom!: string;

  constructor(
    private route: ActivatedRoute,
    private classeClient: ClasseService
  ) {}

  ngOnInit(): void {
    this.classeId = this.route.snapshot.paramMap.get('id')!;
    this.listerEtudiants();
    this.recupererClasse();
  }

  listerEtudiants(): void {
    this.classeClient.listerEtudiantsClasse(this.classeId).subscribe((data) => {
      this.etudiants = data;
    });
  }

  recupererClasse(): void {
    this.classeClient.details(this.classeId).subscribe((classe: Classe) => {
      this.classeNom = classe.libelle;
    });
  }
}
