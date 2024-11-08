import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminLoginComponent } from '../../components/admin-inicio/admin-inicio.component';




@NgModule({
  declarations: [AdminLoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
