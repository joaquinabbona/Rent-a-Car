import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
<<<<<<< Updated upstream
import { AddCarsComponent } from './add-cars/add-cars.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { ListCarsComponent } from './list-cars/list-cars.component';
import { CarManagerComponent } from './car-manager/car-manager.component';
import { EditCarsComponent } from './edit-cars/edit-cars.component';
import { PaymentComponent } from './payment/payment.component';
=======
import { AddCarsComponent } from './components/add-cars/add-cars.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { ListCarsComponent } from './components/list-cars/list-cars.component';
import { CarManagerComponent } from './components/car-manager/car-manager.component';
import { EditCarsComponent } from './components/edit-cars/edit-cars.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CarsRoutingModule } from './cars-routing.module';
import { BookingCalendarComponent } from './comppnents/booking-calendar/booking-calendar.component';
>>>>>>> Stashed changes

@NgModule({
  declarations: [
    AddCarsComponent,
    ListCarsComponent,
    CarDetailsComponent,
    CarManagerComponent,
    EditCarsComponent,
    PaymentComponent,
    BookingCalendarComponent
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