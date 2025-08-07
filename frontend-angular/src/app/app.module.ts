import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ListClasseComponent } from './components/list-classe/list-classe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListEtudiantComponent } from './components/list-etudiant/list-etudiant.component';
// import { EtudiantGraphQLModule } from './etudiant-graphql.module';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    ListClasseComponent,
    ListEtudiantComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    // EtudiantGraphQLModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
