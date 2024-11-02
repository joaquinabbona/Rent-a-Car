import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { CarsModule } from './cars/cars.module';
import { ClientsModule } from './clients/clients/clients.module';
import { ClientEditComponent } from './clients/clients/components/client-edit/client-edit.component';
import { HomeComponent } from './home/home/home.component';
import { HomeModule } from './home/home.module';
import { ClientsManagerComponent } from './clients/clients-manager/clients-manager.component';


@NgModule({
  declarations: [
    AppComponent,
    ClientsManagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CarsModule,
    RouterModule,
    ClientsModule,
    HomeModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
