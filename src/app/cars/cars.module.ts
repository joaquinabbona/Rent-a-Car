import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddCarsComponent } from './add-cars/add-cars.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { ListCarsComponent } from './list-cars/list-cars.component';

@NgModule({
  declarations: [
    AddCarsComponent,
    ListCarsComponent,
    CarDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,    // Para ngModel
    RouterModule    // Para routerLink
  ],
  exports: [        // Exporta los componentes si necesitas usarlos fuera de este módulo
    AddCarsComponent,
    ListCarsComponent,
    CarDetailsComponent
  ]
})
export class CarsModule { 
  constructor(){}
}