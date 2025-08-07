import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ListClasseComponent } from './components/list-classe/list-classe.component';
import { ListEtudiantComponent } from './components/list-etudiant/list-etudiant.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'classe', component: ListClasseComponent },
  { path: 'etudiant', component: ListEtudiantComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
