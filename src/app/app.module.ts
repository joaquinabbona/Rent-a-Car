import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { CarsModule } from './cars/cars.module';
import { ClientsModule } from './clients/clients/clients.module';
import { HomeComponent } from './home/home/home.component';
import { HomeModule } from './home/home.module';
import { ClientsManagerComponent } from './clients/clients-manager/clients-manager.component';
import { AdminModule } from './admin/module/admin/admin.module';
import { AdminFirstpageComponent } from './admin/components/admin-firstpage/admin-firstpage.component';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment/payment/payment.component';


@NgModule({
  declarations: [
    AppComponent,
    ClientsManagerComponent,
    AdminFirstpageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    ClientsModule,
    HomeModule,
    AdminModule,
    CarsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
