import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from '../../components/admin-inicio/admin-inicio.component';
import { AdminAddComponent } from '../../components/admin-add/admin-add.component';
import { AdminListComponent } from '../../components/admin-list/admin-list.component';
import { AdminFirstpageComponent } from '../../components/admin-firstpage/admin-firstpage.component';
import { AdminGestionClientesComponent } from '../../components/admin-gestion-clientes/admin-gestion-clientes.component';
import { AdminGestionAdminComponent } from '../../components/admin-gestion-admin/admin-gestion-admin.component';
import { AdminGestionVehiculosComponent } from '../../components/admin-gestion-vehiculos/admin-gestion-vehiculos.component';
import { AuthGuard } from '../../../auth/auth.guard';

const routes: Routes = [
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'add', component: AdminAddComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'list', component: AdminListComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'admin-firstpage', component: AdminFirstpageComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'gestion-clientes', component: AdminGestionClientesComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'gestion-admin', component: AdminGestionAdminComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'gestion-vehiculos', component: AdminGestionVehiculosComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
