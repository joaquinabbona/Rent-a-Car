import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailsComponent } from './cars/car-details/car-details.component';
import { ListCarsComponent } from './cars/list-cars/list-cars.component';
import { AddCarsComponent } from './cars/add-cars/add-cars.component';
import { CarManagerComponent } from './cars/car-manager/car-manager.component';
import { HomeComponent } from './home/home/home.component';
import { EditCarsComponent } from './cars/edit-cars/edit-cars.component';
import { PaymentComponent } from './payment/payment/payment.component';
import { ClientLoginComponent } from './clients/clients/components/client-login/client-login.component';
import { CarDetailsToEditComponent } from './cars/car-details-to-edit/car-details-to-edit.component';
import { ListToEditComponent } from './cars/list-to-edit/list-to-edit.component';
import { AuthGuard } from './auth/auth.guard';
import { CarRentalComponent } from './cars/car-rental/car-rental.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: { roles: ['client'] } },
  
  // Rutas protegidas para administradores
  { 
    path: 'admin', 
    loadChildren: () => import('./admin/module/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }  // Solo administradores
  },

  { path: 'admin-edit-car/:id', component: CarDetailsToEditComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'car-manager', component: CarManagerComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'list-to-edit', component: ListToEditComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'admin', loadChildren: () => import('./admin/module/admin/admin.module').then(m => m.AdminModule) },
  { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path:'add-cars' , component: AddCarsComponent},
  {path: 'car-manager', component: CarManagerComponent},
  {path: 'home', component: HomeComponent},
  { path: 'edit-car/:id', component: EditCarsComponent },
  {path: 'payment/:carId',component:PaymentComponent},
  {path: 'login',component:ClientLoginComponent},
  {path: 'admin-edit-car/:id', component:CarDetailsToEditComponent},
  {path: 'list-to-edit', component: ListToEditComponent},
  {path: 'car-rental/:id', component: CarRentalComponent},

  // Rutas accesibles para clientes
  { path: 'car-details/:id', component: CarDetailsComponent, canActivate: [AuthGuard], data: { roles: ['client', 'admin'] } },
  { path: 'list-cars', component: ListCarsComponent },
  { path: 'add-cars', component: AddCarsComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'edit-car/:id', component: EditCarsComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'payment/:carId', component: PaymentComponent, canActivate: [AuthGuard], data: { roles: ['client'] } },
  
  // Login de clientes y de admin
  { path: 'login', component: ClientLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
