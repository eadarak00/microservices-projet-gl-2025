// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Etudiant } from 'src/app/models/etudiant';
// import { Classe } from 'src/app/models/classe';
// import { ClasseService } from 'src/app/services/classe.service';

// @Component({
//   selector: 'app-list-etudiant-classe',
//   templateUrl: './list-etudiant-classe.component.html',
//   styleUrls: ['./list-etudiant-classe.component.css']
// })
// export class ListEtudiantClasseComponent implements OnInit {
//   etudiants: Etudiant[] = [];
//   filteredEtudiants: Etudiant[] = [];
//   classeId!: string;
//   classeNom!: string;
//   loading = false;
//   searchTerm = '';
//   sortField = '';
//   sortDirection: 'asc' | 'desc' = 'asc';
//   currentPage = 1;
//   itemsPerPage = 10;
//   showFilters = false;
//   Math = Math;

//   constructor(
//     private route: ActivatedRoute,
//     private classeClient: ClasseService
//   ) {}

//   ngOnInit(): void {
//     this.classeId = this.route.snapshot.paramMap.get('id')!;
//     this.listerEtudiants();
//     this.recupererClasse();
//   }

//   listerEtudiants(): void {
//     this.loading = true;
//     this.classeClient.listerEtudiantsClasse(this.classeId).subscribe({
//       next: (data) => {
//         this.etudiants = data;
//         this.filteredEtudiants = [...data];
//         this.loading = false;
//       },
//       error: (error) => {
//         console.error('Erreur lors du chargement des étudiants:', error);
//         this.loading = false;
//       }
//     });
//   }

//   recupererClasse(): void {
//     this.classeClient.details(this.classeId).subscribe((classe: Classe) => {
//       this.classeNom = classe.libelle;
//     });
//   }

//   onSearch(): void {
//     if (!this.searchTerm.trim()) {
//       this.filteredEtudiants = [...this.etudiants];
//     } else {
//       this.filteredEtudiants = this.etudiants.filter(etudiant =>
//         etudiant.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//         etudiant.prenom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//         etudiant.matricule.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//         etudiant.telephone.includes(this.searchTerm)
//       );
//     }
//     this.currentPage = 1;
//   }

//   clearSearch(): void {
//     this.searchTerm = '';
//     this.filteredEtudiants = [...this.etudiants];
//     this.currentPage = 1;
//   }

//   sortBy(field: keyof Etudiant): void {
//     if (this.sortField === field) {
//       this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
//     } else {
//       this.sortField = field;
//       this.sortDirection = 'asc';
//     }

//     this.filteredEtudiants.sort((a, b) => {
//       const valueA = (a[field] || '').toString().toLowerCase();
//       const valueB = (b[field] || '').toString().toLowerCase();
      
//       if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
//       if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
//       return 0;
//     });
//   }

//   get paginatedEtudiants(): Etudiant[] {
//     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
//     return this.filteredEtudiants.slice(startIndex, startIndex + this.itemsPerPage);
//   }

//   get totalPages(): number {
//     return Math.ceil(this.filteredEtudiants.length / this.itemsPerPage);
//   }

//   get pageNumbers(): number[] {
//     return Array.from({length: this.totalPages}, (_, i) => i + 1);
//   }

//   goToPage(page: number): void {
//     if (page >= 1 && page <= this.totalPages) {
//       this.currentPage = page;
//     }
//   }

//   exportToCSV(): void {
//     const headers = ['Matricule', 'Nom', 'Prénom', 'Téléphone'];
//     const csvContent = [
//       headers.join(','),
//       ...this.filteredEtudiants.map(etudiant => 
//         [etudiant.matricule, etudiant.nom, etudiant.prenom, etudiant.telephone].join(',')
//       )
//     ].join('\n');

//     const blob = new Blob([csvContent], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `etudiants_${this.classeNom || 'classe'}.csv`;
//     a.click();
//     window.URL.revokeObjectURL(url);
//   }

//   onRefresh(): void {
//     this.listerEtudiants();
//   }

//   getSortIcon(field: string): string {
//     if (this.sortField !== field) return '↕️';
//     return this.sortDirection === 'asc' ? '↑' : '↓';
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Etudiant } from 'src/app/models/etudiant';
import { Classe } from 'src/app/models/classe';
import { ClasseService } from 'src/app/services/classe.service';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Étendre l'interface jsPDF pour inclure getNumberOfPages()
declare module 'jspdf' {
  interface jsPDF {
    getNumberOfPages(): number;
  }
}

// Typage minimal pour le hook didDrawPage
interface AutoTableHookData {
  pageNumber: number;
}

@Component({
  selector: 'app-list-etudiant-classe',
  templateUrl: './list-etudiant-classe.component.html',
  styleUrls: ['./list-etudiant-classe.component.css']
})
export class ListEtudiantClasseComponent implements OnInit {
  etudiants: Etudiant[] = [];
  filteredEtudiants: Etudiant[] = [];
  classeId!: string;
  classeNom!: string;
  loading = false;
  searchTerm = '';
  sortField = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  currentPage = 1;
  itemsPerPage = 10;
  Math = Math;

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
    this.loading = true;
    this.classeClient.listerEtudiantsClasse(this.classeId).subscribe({
      next: (data) => {
        this.etudiants = data;
        this.filteredEtudiants = [...data];
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des étudiants:', error);
        this.loading = false;
      }
    });
  }

  recupererClasse(): void {
    this.classeClient.details(this.classeId).subscribe((classe: Classe) => {
      this.classeNom = classe.libelle;
    });
  }

  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.filteredEtudiants = [...this.etudiants];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredEtudiants = this.etudiants.filter(e =>
        e.nom.toLowerCase().includes(term) ||
        e.prenom.toLowerCase().includes(term) ||
        e.matricule.toLowerCase().includes(term) ||
        e.telephone.includes(this.searchTerm)
      );
    }
    this.currentPage = 1;
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredEtudiants = [...this.etudiants];
    this.currentPage = 1;
  }

  sortBy(field: keyof Etudiant): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.filteredEtudiants.sort((a, b) => {
      const valueA = (a[field] || '').toString().toLowerCase();
      const valueB = (b[field] || '').toString().toLowerCase();
      return valueA < valueB
        ? (this.sortDirection === 'asc' ? -1 : 1)
        : valueA > valueB
        ? (this.sortDirection === 'asc' ? 1 : -1)
        : 0;
    });
  }

  get paginatedEtudiants(): Etudiant[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredEtudiants.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredEtudiants.length / this.itemsPerPage);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  exportToCSV(): void {
    const headers = ['Matricule', 'Nom', 'Prénom', 'Téléphone'];
    const csvContent = [
      headers.join(','),
      ...this.filteredEtudiants.map(e => 
        [e.matricule, e.nom, e.prenom, e.telephone].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `etudiants_${this.classeNom || 'classe'}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  exportToPDF(): void {
    const doc = new jsPDF();

    const primaryColor: [number, number, number] = [59, 130, 246];    // Bleu
    const secondaryColor: [number, number, number] = [107, 114, 128]; // Gris
    const accentColor: [number, number, number] = [16, 185, 129];     // Vert

    // En-tête du PDF
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Liste des Étudiants', 20, 25);

    if (this.classeNom) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'normal');
      doc.text(`Classe: ${this.classeNom}`, 20, 35);
    }

    doc.setTextColor(...secondaryColor);
    doc.setFontSize(10);
    doc.text(`ID Classe: ${this.classeId}`, 150, 25);
    doc.text(`Date d'export: ${new Date().toLocaleDateString('fr-FR')}`, 150, 30);
    doc.text(`Total étudiants: ${this.filteredEtudiants.length}`, 150, 35);

    doc.setDrawColor(...accentColor);
    doc.setLineWidth(2);
    doc.line(20, 45, 190, 45);

    // Colonnes et lignes du tableau
    const tableColumns = [
      { header: 'N°', dataKey: 'numero' },
      { header: 'Matricule', dataKey: 'matricule' },
      { header: 'Nom', dataKey: 'nom' },
      { header: 'Prénom', dataKey: 'prenom' },
      { header: 'Téléphone', dataKey: 'telephone' }
    ];

    const tableRows = this.filteredEtudiants.map((e, i) => ({
      numero: (i + 1).toString(),
      matricule: e.matricule,
      nom: e.nom,
      prenom: e.prenom,
      telephone: e.telephone
    }));

    // Génération du tableau avec jspdf-autotable
    autoTable(doc, {
      columns: tableColumns,
      body: tableRows,
      startY: 55,
      theme: 'grid',
      styles: {
        fontSize: 10,
        cellPadding: 5,
        textColor: [51, 51, 51],
        lineColor: [229, 231, 235],
        lineWidth: 0.5
      },
      headStyles: {
        fillColor: primaryColor,
        textColor: [255, 255, 255],
        fontSize: 11,
        fontStyle: 'bold',
        halign: 'center'
      },
      alternateRowStyles: {
        fillColor: [249, 250, 251]
      },
      columnStyles: {
        numero: { halign: 'center', cellWidth: 15 },
        matricule: { halign: 'center', cellWidth: 35 },
        nom: { halign: 'left', cellWidth: 45 },
        prenom: { halign: 'left', cellWidth: 45 },
        telephone: { halign: 'center', cellWidth: 40 }
      },
      margin: { top: 55, left: 20, right: 20 },
      didDrawPage: (data: AutoTableHookData) => {
        const pageCount = doc.getNumberOfPages();
        const currentPage = data.pageNumber;

        doc.setFontSize(8).setTextColor(...secondaryColor);
        doc.text(
          `Page ${currentPage} sur ${pageCount}`,
          doc.internal.pageSize.width / 2,
          doc.internal.pageSize.height - 10,
          { align: 'center' }
        );

        doc.setFontSize(8);
        doc.text('Système de Gestion Scolaire', 20, doc.internal.pageSize.height - 10);
      }
    });

    // Résumé en bas si place disponible
    const finalY = (doc as any).lastAutoTable?.finalY || 55;
    if (finalY < doc.internal.pageSize.height - 50) {
      doc.setFillColor(249, 250, 251);
      doc.rect(20, finalY + 10, 170, 25, 'F');
      doc.setDrawColor(...accentColor);
      doc.rect(20, finalY + 10, 170, 25);

      doc.setTextColor(...secondaryColor);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Résumé', 25, finalY + 20);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`• Total des étudiants: ${this.filteredEtudiants.length}`, 25, finalY + 26);

      if (this.searchTerm) {
        doc.text(`• Résultats filtrés pour: "${this.searchTerm}"`, 25, finalY + 31);
      }
    }

    const fileName = `etudiants_${this.classeNom || 'classe'}_${new Date().toLocaleDateString('fr-FR').replace(/\//g, '-')}.pdf`;
    doc.save(fileName);
  }

  onRefresh(): void {
    this.listerEtudiants();
  }

  getSortIcon(field: string): string {
    if (this.sortField !== field) return 'fa-sort';
    return this.sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down';
  }
}
