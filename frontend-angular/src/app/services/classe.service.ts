// src/app/core/services/classe.service.ts
import { Injectable } from '@angular/core';
import { Apollo, ApolloBase } from 'apollo-angular';
import { gql } from 'apollo-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Classe } from '../models/classe';


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

@Injectable({
  providedIn: 'root',
})
export class ClasseService {
  private apolloClient: ApolloBase;
  private apiUrl = `${environment.apiGatewayUrl}/classe`;

  constructor(private apollo: Apollo, private http: HttpClient) {
    // this.apolloClient = this.apollo.use('classeClient');
    this.apolloClient = this.apollo;
  }


  listerClasses(): Observable<Classe[]> {
    return this.apolloClient
      .watchQuery<{ classes: Classe[] }>({
        query: LISTER_CLASSES,
      })
      .valueChanges.pipe(map((result) => result.data.classes));
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