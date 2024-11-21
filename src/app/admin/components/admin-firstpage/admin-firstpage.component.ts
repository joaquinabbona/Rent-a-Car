import { Component } from '@angular/core';
import { AdminModule } from '../../module/admin/admin.module';
import { Location } from '@angular/common';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-firstpage',
  templateUrl: './admin-firstpage.component.html',
  styleUrls: ['./admin-firstpage.component.css']
})
export class AdminFirstpageComponent {
  activeComponent: 'gestion-clientes' | 'gestion-admin' | 'gestion-vehiculos'| 'gestion-sucursales' | null = null; 

  constructor(
    private adminModule: AdminModule,
    private location: Location,
    private authService: AuthService,
    private router: Router
  ) {}

  showComponent(component: 'gestion-clientes' | 'gestion-admin' | 'gestion-vehiculos' | 'gestion-sucursales'): void {
    this.activeComponent = component;
  }

  goBack(): void {
    this.location.back();
  }

  logoff(): void {
    this.authService.logout(); 
    this.router.navigate(['/login']); 
  }
}
