import { Component } from '@angular/core';
import { ServiceAdminService } from '../../services/service-admin.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-admin-gestion-admin',
  templateUrl: './admin-gestion-admin.component.html',
  styleUrl: './admin-gestion-admin.component.css'
})
export class AdminGestionAdminComponent {

  constructor(private adminService: ServiceAdminService,
    private location: Location
    ) {}

  activeComponent: 'list' | 'add' | 'delete'| null = null; 

  showComponent(component: 'list' | 'add' | 'delete'): void {
    this.activeComponent = component;
  }
  goBack(): void {
    this.location.back();
  }
}
