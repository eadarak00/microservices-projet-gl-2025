import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EtudiantService } from 'src/app/services/etudiant.service';
import { ClasseService } from 'src/app/services/classe.service';
import { Etudiant } from 'src/app/models/etudiant';
import { Classe } from 'src/app/models/classe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-etudiant',
  templateUrl: './list-etudiant.component.html',
  styleUrls: ['./list-etudiant.component.css'],
})
export class ListEtudiantComponent implements OnInit {
  // Données principales
  etudiants: Etudiant[] = [];
  etudiantsFiltres: Etudiant[] = [];
  classes: Classe[] = [];

  // Formulaire et modal
  etudiantForm!: FormGroup;
  etudiantSelectionne: Etudiant | null = null;
  modeModification = false;

  // Filtres et recherche
  searchTerm = '';
  filtreClasse = '';
  triPar = 'nom';
  ordreTri: 'asc' | 'desc' = 'asc';
  filtresAvancesOuverts = false;

  constructor(
    private fb: FormBuilder,
    private etudiantService: EtudiantService,
    private classeService: ClasseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.chargerClasses();
    this.chargerEtudiants();
  }

  /**
   * Initialisation du formulaire réactif
   */
  initForm(): void {
    this.etudiantForm = this.fb.group({
      matricule: [''],
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      telephone: ['', [Validators.pattern(/^[\+]?[0-9\s\-\(\)]+$/)]],
      adresse: [''],
      classeId: ['', Validators.required],
    });
  }

  /**
   * Chargement des classes disponibles
   */
  chargerClasses(): void {
    this.classeService.listerClasses().subscribe({
      next: (data) => {
        this.classes = data;
        console.log('Classes chargées:', this.classes.length);
      },
      error: (err) => {
        console.error('Erreur chargement classes:', err);
        this.afficherNotification(
          'Erreur lors du chargement des classes',
          'error'
        );
      },
    });
  }

  /**
   * Chargement des étudiants
   */
  chargerEtudiants(): void {
    this.etudiantService.listerEtudiants().subscribe({
      next: (data) => {
        this.etudiants = data;
        this.filtrerEtudiants();
        console.log('Étudiants chargés:', this.etudiants.length);
        console.log('Etudiants', this.etudiants);
      },
      error: (err) => {
        console.error('Erreur chargement étudiants:', err);
        this.afficherNotification(
          'Erreur lors du chargement des étudiants',
          'error'
        );
      },
    });
  }

  /**
   * Filtrage et recherche des étudiants
   */
  filtrerEtudiants(): void {
    let resultats = [...this.etudiants];

    // Filtre par terme de recherche
    if (this.searchTerm.trim()) {
      const terme = this.searchTerm.toLowerCase().trim();
      resultats = resultats.filter(
        (etudiant) =>
          etudiant.nom?.toLowerCase().includes(terme) ||
          etudiant.prenom?.toLowerCase().includes(terme) ||
          etudiant.matricule?.toLowerCase().includes(terme) ||
          etudiant.telephone?.includes(terme) ||
          etudiant.adresse?.toLowerCase().includes(terme)
      );
    }

    // Filtre par classe
    if (this.filtreClasse) {
      resultats = resultats.filter(
        (etudiant) => etudiant.classeId === this.filtreClasse
      );
    }

    // Tri des résultats
    this.trierEtudiants(resultats);

    this.etudiantsFiltres = resultats;
  }

  /**
   * Tri des étudiants selon les critères sélectionnés
   */
  private trierEtudiants(etudiants: Etudiant[]): void {
    etudiants.sort((a, b) => {
      let valeurA: string | undefined;
      let valeurB: string | undefined;

      switch (this.triPar) {
        case 'nom':
          valeurA = a.nom;
          valeurB = b.nom;
          break;
        case 'prenom':
          valeurA = a.prenom;
          valeurB = b.prenom;
          break;
        case 'matricule':
          valeurA = a.matricule;
          valeurB = b.matricule;
          break;
        case 'classe':
          valeurA = this.getClasseLibelle(a.classeId);
          valeurB = this.getClasseLibelle(b.classeId);
          break;
        default:
          valeurA = a.nom;
          valeurB = b.nom;
      }

      // Gestion des valeurs undefined
      if (!valeurA && !valeurB) return 0;
      if (!valeurA) return 1;
      if (!valeurB) return -1;

      const comparaison = valeurA.localeCompare(valeurB, 'fr', {
        sensitivity: 'base',
        numeric: true,
      });

      return this.ordreTri === 'desc' ? -comparaison : comparaison;
    });
  }

  /**
   * Ouverture du modal d'ajout/modification
   */
  ouvrirModal(edition: boolean = false, etudiant?: Etudiant): void {
    const modal = document.getElementById('etudiantModal');
    if (!modal) return;

    this.modeModification = edition;

    if (edition && etudiant) {
      this.etudiantSelectionne = etudiant;
      this.etudiantForm.patchValue({
        matricule: etudiant.matricule || '',
        nom: etudiant.nom || '',
        prenom: etudiant.prenom || '',
        telephone: etudiant.telephone || '',
        adresse: etudiant.adresse || '',
        classeId: etudiant.classeId || '',
      });
    } else {
      this.etudiantSelectionne = null;
      this.etudiantForm.reset();
      // Génération automatique du matricule si nécessaire
      this.genererMatricule();
    }

    // Animation d'ouverture du modal
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.style.opacity = '1';
      modal.style.transform = 'scale(1)';
    }, 10);
  }

  /**
   * Fermeture du modal
   */
  fermerModal(): void {
    const modal = document.getElementById('etudiantModal');
    if (!modal) return;

    // Animation de fermeture
    modal.style.opacity = '0';
    modal.style.transform = 'scale(0.95)';

    setTimeout(() => {
      modal.classList.add('hidden');
      this.etudiantForm.reset();
      this.etudiantSelectionne = null;
      this.modeModification = false;
    }, 300);
  }

  /**
   * Soumission du formulaire
   */
  onSubmit(): void {
    if (this.etudiantForm.invalid) {
      this.etudiantForm.markAllAsTouched();
      this.afficherNotification(
        'Veuillez remplir tous les champs obligatoires',
        'warning'
      );
      return;
    }

    const formValue = { ...this.etudiantForm.value };

    // Génération automatique du matricule si vide
    if (!formValue.matricule) {
      formValue.matricule = this.genererMatriculeAuto();
    }

    // Nettoyage des données
    formValue.nom = this.capitalizeFirstLetter(formValue.nom?.trim() || '');
    formValue.prenom = this.capitalizeFirstLetter(
      formValue.prenom?.trim() || ''
    );
    formValue.telephone = formValue.telephone?.trim() || '';
    formValue.adresse = formValue.adresse?.trim() || '';

    if (this.modeModification && this.etudiantSelectionne) {
      this.modifierEtudiant(formValue);
    } else {
      this.ajouterEtudiant(formValue);
    }
  }

  /**
   * Ajout d'un nouvel étudiant
   */
  private ajouterEtudiant(etudiantData: any): void {
    this.etudiantService.ajouterEtudiant(etudiantData).subscribe({
      next: (response) => {
        console.log('Étudiant ajouté avec succès:', response);
        this.afficherNotification(
          `Étudiant ${etudiantData.prenom} ${etudiantData.nom} ajouté avec succès`,
          'success'
        );
        this.fermerModal();
        this.chargerEtudiants();
      },
      error: (err) => {
        console.error('Erreur ajout étudiant:', err);
        this.afficherNotification(
          "Erreur lors de l'ajout de l'étudiant",
          'error'
        );
      },
    });
  }

  /**
   * Modification d'un étudiant existant
   */
  private modifierEtudiant(etudiantData: any): void {
    if (!this.etudiantSelectionne?.id) return;

    this.etudiantService
      .modifierEtudiant(this.etudiantSelectionne.id, etudiantData)
      .subscribe({
        next: (response) => {
          console.log('Étudiant modifié avec succès:', response);
          this.afficherNotification(
            `Étudiant ${etudiantData.prenom} ${etudiantData.nom} modifié avec succès`,
            'success'
          );
          this.fermerModal();
          this.chargerEtudiants();
        },
        error: (err) => {
          console.error('Erreur modification étudiant:', err);
          this.afficherNotification(
            "Erreur lors de la modification de l'étudiant",
            'error'
          );
        },
      });
  }

  /**
   * Suppression d'un étudiant
   */
  supprimer(id: string): void {
    const etudiant = this.etudiants.find((e) => e.id === id);
    const nomComplet = etudiant
      ? `${etudiant.prenom} ${etudiant.nom}`
      : 'cet étudiant';

    if (
      confirm(
        `Êtes-vous sûr de vouloir supprimer ${nomComplet} ?\n\nCette action est irréversible.`
      )
    ) {
      this.etudiantService.supprimerEtudiant(id).subscribe({
        next: () => {
          console.log('Étudiant supprimé avec succès');
          this.afficherNotification(
            `${nomComplet} a été supprimé avec succès`,
            'success'
          );
          this.chargerEtudiants();
        },
        error: (err) => {
          console.error('Erreur suppression étudiant:', err);
          this.afficherNotification(
            "Erreur lors de la suppression de l'étudiant",
            'error'
          );
        },
      });
    }
  }

  /**
   * Toggle des filtres avancés
   */
  toggleFiltresAvances(): void {
    this.filtresAvancesOuverts = !this.filtresAvancesOuverts;
  }

  /**
   * Réinitialisation de tous les filtres
   */
  resetFiltres(): void {
    this.searchTerm = '';
    this.filtreClasse = '';
    this.triPar = 'nom';
    this.ordreTri = 'asc';
    this.filtresAvancesOuverts = false;
    this.filtrerEtudiants();
    this.afficherNotification('Filtres réinitialisés', 'info');
  }

  /**
   * Obtient le libellé d'une classe par son ID
   */
  getClasseLibelle(classeId?: string): string {
    if (!classeId) return 'Non assigné';
    const classe = this.classes.find((c) => c.id === classeId);
    return classe?.libelle || 'Classe inconnue';
  }

  /**
   * Obtient la classe complète par son ID
   */
  getClasse(classeId?: string): Classe | undefined {
    if (!classeId) return undefined;
    return this.classes.find((c) => c.id === classeId);
  }

  /**
   * Génération automatique d'un matricule
   */
  private genererMatricule(): void {
    if (!this.etudiantForm.get('matricule')?.value) {
      const matriculeAuto = this.genererMatriculeAuto();
      this.etudiantForm.patchValue({ matricule: matriculeAuto });
    }
  }

  /**
   * Génération d'un matricule automatique
   */
  private genererMatriculeAuto(): string {
    const year = new Date().getFullYear();
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 999)
      .toString()
      .padStart(3, '0');
    return `ETU${year}${month}${random}`;
  }

  /**
   * Capitalise la première lettre d'une chaîne
   */
  private capitalizeFirstLetter(str: string): string {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  /**
   * Affichage de notifications
   */
  private afficherNotification(
    message: string,
    type: 'success' | 'error' | 'warning' | 'info' = 'info'
  ): void {
    // Ici vous pouvez implémenter votre système de notification
    // Par exemple avec un service de toast/snackbar
    console.log(`[${type.toUpperCase()}] ${message}`);

    // Notification simple avec alert pour l'exemple
    if (type === 'error') {
      alert(`Erreur: ${message}`);
    } else if (type === 'success') {
      alert(`Succès: ${message}`);
    } else if (type === 'warning') {
      alert(`Attention: ${message}`);
    } else {
      console.log(`Info: ${message}`);
    }
  }

  /**
   * Recherche avancée par plusieurs critères
   */
  rechercheAvancee(criteres: {
    nom?: string;
    prenom?: string;
    classe?: string;
    telephone?: string;
  }): Etudiant[] {
    return this.etudiants.filter((etudiant) => {
      const matchNom =
        !criteres.nom ||
        etudiant.nom?.toLowerCase().includes(criteres.nom.toLowerCase());
      const matchPrenom =
        !criteres.prenom ||
        etudiant.prenom?.toLowerCase().includes(criteres.prenom.toLowerCase());
      const matchClasse =
        !criteres.classe || etudiant.classeId === criteres.classe;
      const matchTelephone =
        !criteres.telephone || etudiant.telephone?.includes(criteres.telephone);

      return matchNom && matchPrenom && matchClasse && matchTelephone;
    });
  }

  /**
   * Obtient des statistiques sur les étudiants
   */
  getStatistiques(): {
    total: number;
    parClasse: { [key: string]: number };
    sansMatricule: number;
    sansContact: number;
  } {
    const stats = {
      total: this.etudiants.length,
      parClasse: {} as { [key: string]: number },
      sansMatricule: 0,
      sansContact: 0,
    };

    this.etudiants.forEach((etudiant) => {
      // Statistiques par classe
      const classeLib = this.getClasseLibelle(etudiant.classeId);
      stats.parClasse[classeLib] = (stats.parClasse[classeLib] || 0) + 1;

      // Étudiants sans matricule
      if (!etudiant.matricule) {
        stats.sansMatricule++;
      }

      // Étudiants sans contact
      if (!etudiant.telephone && !etudiant.adresse) {
        stats.sansContact++;
      }
    });

    return stats;
  }

  /**
   * Getters pour les contrôles du formulaire (utilisés dans le template)
   */
  get nomControl() {
    return this.etudiantForm.get('nom');
  }
  get prenomControl() {
    return this.etudiantForm.get('prenom');
  }
  get classeIdControl() {
    return this.etudiantForm.get('classeId');
  }
  get telephoneControl() {
    return this.etudiantForm.get('telephone');
  }
  get matriculeControl() {
    return this.etudiantForm.get('matricule');
  }
  get adresseControl() {
    return this.etudiantForm.get('adresse');
  }

  /**
   * Lifecycle hook - nettoyage lors de la destruction du composant
   */
  ngOnDestroy(): void {
    // Nettoyage des observables si nécessaire
    // Fermeture du modal si ouvert
    this.fermerModal();
  }
}
