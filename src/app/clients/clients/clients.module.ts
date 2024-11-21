import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientAddComponent } from './components/client-add/client-add.component';
import { EditClientComponent } from './components/client-edit/client-edit.component';
import { ClientLoginComponent } from './components/client-login/client-login.component';
import { ClientDeleteComponent } from './components/client-delete/client-delete.component';
import { ClientFirstpageComponent } from './components/client-firstpage/client-firstpage.component';
import { CarsModule } from '../../cars/cars.module';
import { ClientHistoryComponent } from './components/client-history/client-history.component';

@NgModule({
  declarations: [
    ClientListComponent,
    ClientAddComponent,
    EditClientComponent,
    ClientLoginComponent,
    EditClientComponent,
    ClientDeleteComponent,
    ClientFirstpageComponent,
    ClientHistoryComponent, 
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CarsModule
  ],
  exports: [
    ClientListComponent,
    ClientAddComponent,
    EditClientComponent,
    ClientLoginComponent,
    EditClientComponent,
    ClientDeleteComponent
  ]
})
export class ClientsModule { }
