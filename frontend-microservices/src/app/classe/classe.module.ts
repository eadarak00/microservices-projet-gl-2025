import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClasseRoutingModule } from './classe-routing.module';
import { ClasseListComponent } from './classe-list/classe-list.component';
import { ClasseFormComponent } from './classe-form/classe-form.component';


@NgModule({
  declarations: [
    ClasseListComponent,
    ClasseFormComponent
  ],
  imports: [
    CommonModule,
    ClasseRoutingModule
  ]
})
export class ClasseModule { }
