import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientAddComponent } from './components/client-add/client-add.component';
import { EditClientComponent } from './components/client-edit/client-edit.component';
import { ClientDetailComponent } from './components/client-detail/client-detail.component';
import { ClientLoginComponent } from './components/client-login/client-login.component';
import { ClientDeleteComponent } from './components/client-delete/client-delete.component';


@NgModule({
  declarations: [
    ClientListComponent,
    ClientAddComponent,
    EditClientComponent,
    ClientDetailComponent,
    ClientLoginComponent,
    EditClientComponent,
    ClientDeleteComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    ClientListComponent,
    ClientAddComponent,
    EditClientComponent,
    ClientDetailComponent,
    ClientLoginComponent,
    EditClientComponent,
    ClientDeleteComponent
  ]
})
export class ClientsModule { }
