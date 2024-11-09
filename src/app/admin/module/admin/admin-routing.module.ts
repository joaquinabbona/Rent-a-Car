import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from '../../components/admin-inicio/admin-inicio.component';
import { AdminAddComponent } from '../../components/admin-add/admin-add.component';
import { AdminListComponent } from '../../components/admin-list/admin-list.component';

const routes: Routes = [
  { path: 'login', component: AdminLoginComponent },
  { path: 'add', component: AdminAddComponent },
  { path: 'list', component: AdminListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
