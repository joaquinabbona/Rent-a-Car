import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddCarsComponent } from './add-cars/add-cars.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { ListCarsComponent } from './list-cars/list-cars.component';
import { CarManagerComponent } from './car-manager/car-manager.component';
import { EditCarsComponent } from './edit-cars/edit-cars.component';
import { PaymentComponent } from '../payment/payment/payment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CarDetailsToEditComponent } from './car-details-to-edit/car-details-to-edit.component';
import { ListToEditComponent } from './list-to-edit/list-to-edit.component';
import { CarRentalComponent } from './car-rental/car-rental.component';

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