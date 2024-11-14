import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminLoginComponent } from '../../components/admin-inicio/admin-inicio.component';
import { AdminAddComponent } from '../../components/admin-add/admin-add.component';
import { AdminListComponent } from '../../components/admin-list/admin-list.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ClientsModule } from '../../../clients/clients/clients.module';
import { AdminGestionAdminComponent } from '../../components/admin-gestion-admin/admin-gestion-admin.component';
import { AdminGestionVehiculosComponent } from '../../components/admin-gestion-vehiculos/admin-gestion-vehiculos.component';
import { AdminGestionClientesComponent } from '../../components/admin-gestion-clientes/admin-gestion-clientes.component';


@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminAddComponent,
    AdminListComponent,
    AdminGestionClientesComponent,
    AdminGestionAdminComponent,
    AdminGestionVehiculosComponent,
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
    AdminGestionClientesComponent,
    AdminGestionAdminComponent,
    AdminGestionVehiculosComponent,
  ]
})
export class AdminModule { }
