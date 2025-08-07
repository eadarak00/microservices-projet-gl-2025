// src/app/core/services/etudiant.service.ts
import { Injectable } from '@angular/core';
import { Apollo, ApolloBase } from 'apollo-angular';
import { gql } from 'apollo-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Etudiant } from '../models/etudiant';



const LISTER_ETUDIANTS = gql`
  query {
    etudiants {
      id
      matricule
      nom
      prenom
      telephone
      adresse
    }
  }
`;


@Injectable({
  providedIn: 'root',
})
export class EtudiantService {
  private etudiantClient: ApolloBase;
  private apiUrl = 'http://localhost:8080/api/etudiant';

  constructor(private apollo: Apollo, private http: HttpClient) {
    // this.apolloClient = this.apollo.use('etudiantClient');
    this.etudiantClient = this.apollo.use('etudiantClient');

    // this.apolloClient = this.apollo;
  }


  listerEtudiants(): Observable<Etudiant[]> {
    return this.etudiantClient
      .watchQuery<{ etudiants: Etudiant[] }>({
        query: LISTER_ETUDIANTS,
      })
      .valueChanges.pipe(map((result) => result.data.etudiants));
  }

  ajouterEtudiant(etudiant: Etudiant): Observable<Etudiant> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Etudiant>(this.apiUrl + '/', etudiant, { headers });
  }

  modifierEtudiant(id: string, etudiant: Etudiant): Observable<Etudiant> {
    return this.http.put<Etudiant>(`${this.apiUrl}/${id}`, etudiant);
  }

  supprimerEtudiant(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}