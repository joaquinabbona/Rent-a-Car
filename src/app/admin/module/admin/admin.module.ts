import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminLoginComponent } from '../../components/admin-inicio/admin-inicio.component';
import { AdminAddComponent } from '../../components/admin-add/admin-add.component';
import { AdminListComponent } from '../../components/admin-list/admin-list.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ClientsModule } from '../../../clients/clients/clients.module';
import { AdminGestionClientesComponent } from '../../components/admin-gestion-clientes/admin-gestion-clientes.component';




@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminAddComponent,
    AdminListComponent,
    AdminGestionClientesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule, 
    ClientsModule
  ],
  exports:[
    AdminAddComponent,
    AdminListComponent,
  ]
})
export class AdminModule { }
