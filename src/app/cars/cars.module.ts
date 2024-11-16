import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddCarsComponent } from './components/add-cars/add-cars.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { ListCarsComponent } from './components/list-cars/list-cars.component';
import { CarManagerComponent } from './components/car-manager/car-manager.component';
import { EditCarsComponent } from './components/edit-cars/edit-cars.component';
import { PaymentComponent } from '../payment/payment/payment.component';
import { CarDetailsToEditComponent } from './components/car-details-to-edit/car-details-to-edit.component';
import { ListToEditComponent } from './components/list-to-edit/list-to-edit.component';
import { CarRentalComponent } from './components/car-rental/car-rental.component';
@NgModule({
  declarations: [
    AddCarsComponent,
    ListCarsComponent,
    CarDetailsComponent,
    CarManagerComponent,
    EditCarsComponent,
    PaymentComponent,
    CarDetailsToEditComponent,
    ListToEditComponent,
    CarRentalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,    
    RouterModule,
    ReactiveFormsModule    
  ],
  exports: [        
    AddCarsComponent,
    ListCarsComponent,
    CarDetailsComponent,
    CarManagerComponent,
    CarDetailsToEditComponent
  ]
})
export class CarsModule { 
  constructor(){}
}