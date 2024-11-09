import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminLoginComponent } from '../../components/admin-inicio/admin-inicio.component';
import { AdminAddComponent } from '../../components/admin-add/admin-add.component';
import { AdminListComponent } from '../../components/admin-list/admin-list.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminAddComponent,
    AdminListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
