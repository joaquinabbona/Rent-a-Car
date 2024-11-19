import { Component } from '@angular/core';
import { AdminModule } from '../../module/admin/admin.module';
import { Location } from '@angular/common';


@Component({
  selector: 'app-admin-firstpage',
  templateUrl: './admin-firstpage.component.html',
  styleUrl: './admin-firstpage.component.css'
})
export class AdminFirstpageComponent {
  constructor(private adminModule: AdminModule,
    private location: Location
    ) {}

  activeComponent: 'gestion-clientes' | 'gestion-admin' | 'gestion-vehiculos'| null = null; 

  showComponent(component: 'gestion-clientes' | 'gestion-admin' | 'gestion-vehiculos'): void {
    this.activeComponent = component;
  }
  goBack(): void {
    this.location.back();
  }

}
