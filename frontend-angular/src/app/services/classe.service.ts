// // src/app/core/services/classe.service.ts
// import { Injectable } from '@angular/core';
// import { Apollo, ApolloBase } from 'apollo-angular';
// import { gql } from 'apollo-angular';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { environment } from 'src/environments/environment';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { Classe } from '../models/classe';
// import { Etudiant } from '../models/etudiant';

// const LISTER_CLASSES = gql`
//   query {
//     classes {
//       id
//       libelle
//       niveau
//       specialite
//       departement
//     }
//   }
// `;

// const LISTER_ETUDIANTS_CLASSE = gql`
//   query {
//     etudiantsByClasseId {
//       id
//       matricule
//       nom
//       prenom
//       telephone
//       adresse
//       classeId
//     }
//   }
// `;

// const DETAILS_CLASSE = gql`
//   query recherche($id: ID!) {
//     recherche(id: $id) {
//       id
//       libelle
//     }
//   }
// `;

// @Injectable({
//   providedIn: 'root',
// })
// export class ClasseService {
//   private classeClient: ApolloBase;
//   private apiUrl = `${environment.apiGatewayUrl}/classe`;

//   constructor(private apollo: Apollo, private http: HttpClient) {
//     // this.apolloClient = this.apollo.use('classeClient');
//     this.classeClient = this.apollo.use('classeClient');
//     // this.etudiantClient = this.apollo.use('etudiantClient');
//     // this.apolloClient = this.apollo;
//   }

//   listerClasses(): Observable<Classe[]> {
//     return this.classeClient
//       .watchQuery<{ classes: Classe[] }>({
//         query: LISTER_CLASSES,
//       })
//       .valueChanges.pipe(map((result) => result.data.classes));
//   }

//   details(id: string): Observable<Classe> {
//     return this.apollo
//       .watchQuery<{ classe: Classe }>({
//         query: DETAILS_CLASSE,
//         variables: { id },
//       })
//       .valueChanges.pipe(map((result) => result.data.classe));
//   }

//   //  listerEtudiantsClasse(): Observable<Etudiant[]> {
//   //   return this.classeClient
//   //     .watchQuery<{ etudiants: Etudiant[] }>({
//   //       query: LISTER_ETUDIANTS_CLASSE,
//   //     })
//   //     .valueChanges.pipe(map((result) => result.data.etudiants));
//   // }

//   listerEtudiantsClasse(classeId: string): Observable<Etudiant[]> {
//   return this.apollo
//     .watchQuery<{ listerEtudiantsClasse: Etudiant[] }>({
//       query: LISTER_ETUDIANTS_CLASSE,
//       variables: { classeId },
//     })
//     .valueChanges.pipe(map(result => result.data.listerEtudiantsClasse));
// }


//   ajouterClasse(classe: Classe): Observable<Classe> {
//     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
//     return this.http.post<Classe>(this.apiUrl, classe, { headers });
//   }

//   modifierClasse(id: string, classe: Classe): Observable<Classe> {
//     return this.http.put<Classe>(`${this.apiUrl}/${id}`, classe);
//   }

//   supprimerClasse(id: string): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/${id}`);
//   }
// }



import { Injectable } from '@angular/core';
import { Apollo, ApolloBase } from 'apollo-angular';
import { gql } from 'apollo-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Classe } from '../models/classe';
import { Etudiant } from '../models/etudiant';

const LISTER_CLASSES = gql`
  query {
    classes {
      id
      libelle
      niveau
      specialite
      departement
    }
  }
`;

const LISTER_ETUDIANTS_CLASSE = gql`
  query etudiantsByClasseId($classeId: String!) {
    etudiantsByClasseId(classeId: $classeId) {
      id
      matricule
      nom
      prenom
      telephone
      adresse
      classeId
    }
  }
`;

const DETAILS_CLASSE = gql`
  query recherche($id: ID!) {
    recherche(id: $id) {
      id
      libelle
      niveau
      specialite
      departement
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class ClasseService {
  private classeClient: ApolloBase;
  private apiUrl = `${environment.apiGatewayUrl}/classe`;

  constructor(private apollo: Apollo, private http: HttpClient) {
    this.classeClient = this.apollo.use('classeClient');
  }

  listerClasses(): Observable<Classe[]> {
    return this.classeClient
      .watchQuery<{ classes: Classe[] }>({
        query: LISTER_CLASSES,
      })
      .valueChanges.pipe(map((result) => result.data.classes));
  }

  details(id: string): Observable<Classe> {
    return this.classeClient
      .watchQuery<{ recherche: Classe }>({
        query: DETAILS_CLASSE,
        variables: { id },
      })
      .valueChanges.pipe(map((result) => result.data.recherche));
  }

  listerEtudiantsClasse(classeId: string): Observable<Etudiant[]> {
    return this.classeClient
      .watchQuery<{ etudiantsByClasseId: Etudiant[] }>({
        query: LISTER_ETUDIANTS_CLASSE,
        variables: { classeId },
      })
      .valueChanges.pipe(map((result) => result.data.etudiantsByClasseId));
  }

  ajouterClasse(classe: Classe): Observable<Classe> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Classe>(this.apiUrl, classe, { headers });
  }

  modifierClasse(id: string, classe: Classe): Observable<Classe> {
    return this.http.put<Classe>(`${this.apiUrl}/${id}`, classe);
  }

  supprimerClasse(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
