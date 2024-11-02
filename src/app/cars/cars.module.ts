import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddCarsComponent } from './add-cars/add-cars.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { ListCarsComponent } from './list-cars/list-cars.component';
import { CarManagerComponent } from './car-manager/car-manager.component';

@NgModule({
  declarations: [
    AddCarsComponent,
    ListCarsComponent,
    CarDetailsComponent,
    CarManagerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,    
    RouterModule    
  ],
  exports: [        
    AddCarsComponent,
    ListCarsComponent,
    CarDetailsComponent
  ]
})
export class CarsModule { 
  constructor(){}
}