import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailsComponent } from './cars/car-details/car-details.component';
import { AppComponent } from './app.component';
import { ListCarsComponent} from './cars/list-cars/list-cars.component';
import { AddCarsComponent } from './cars/add-cars/add-cars.component';
import { CarManagerComponent } from './cars/car-manager/car-manager.component';
import { HomeComponent } from './home/home/home.component';
import { EditCarsComponent } from './cars/edit-cars/edit-cars.component';
import { PaymentComponent } from './cars/payment/payment.component';
import {ClientLoginComponent} from './clients/clients/components/client-login/client-login.component'



const routes: Routes = [
  {path: 'car-details/:id', component: CarDetailsComponent },
  {path: 'list-cars',component:ListCarsComponent},
  { 
    path: 'clients',
    loadChildren: () => import('./clients/clients/clients.module').then(m => m.ClientsModule)
  },
  { path: 'admin', loadChildren: () => import('./admin/module/admin/admin.module').then(m => m.AdminModule) },
  { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path:'add-cars' , component: AddCarsComponent},
  {path: 'car-manager', component: CarManagerComponent},
  {path: 'home', component: HomeComponent},
  { path: 'edit-car/:id', component: EditCarsComponent },
  {path: 'payment',component:PaymentComponent},
  {path: 'login',component:ClientLoginComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
