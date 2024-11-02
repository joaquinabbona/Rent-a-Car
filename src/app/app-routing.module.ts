import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailsComponent } from './cars/car-details/car-details.component';
import { AppComponent } from './app.component';
import { ListCarsComponent} from './cars/list-cars/list-cars.component';



const routes: Routes = [
  {path: 'car-details/:id', component: CarDetailsComponent },
  {path: 'list-cars',component:ListCarsComponent},
  { 
    path: 'clients',
    loadChildren: () => import('./clients/clients/clients.module').then(m => m.ClientsModule)
  },
  { path: '', redirectTo: '/list-cars', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
