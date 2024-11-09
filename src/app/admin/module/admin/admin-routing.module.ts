import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from '../../components/admin-inicio/admin-inicio.component';
import { AdminAddComponent } from '../../components/admin-add/admin-add.component';
import { AdminListComponent } from '../../components/admin-list/admin-list.component';
import { AdminFirstpageComponent } from '../../components/admin-firstpage/admin-firstpage.component';
import { AdminGestionClientesComponent } from '../../components/admin-gestion-clientes/admin-gestion-clientes.component';
import { AdminGestionAdminComponent } from '../../components/admin-gestion-admin/admin-gestion-admin.component';
import { AdminGestionVehiculosComponent } from '../../components/admin-gestion-vehiculos/admin-gestion-vehiculos.component';


const routes: Routes = [
  { path: 'login', component: AdminLoginComponent },
  { path: 'add', component: AdminAddComponent },
  { path: 'list', component: AdminListComponent },
  {path: '', component: AdminFirstpageComponent},
  {path: 'gestion-clientes', component: AdminGestionClientesComponent},
  {path: 'gestion-admin', component:AdminGestionAdminComponent},
  {path: 'gestion-vehiculos', component: AdminGestionVehiculosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
