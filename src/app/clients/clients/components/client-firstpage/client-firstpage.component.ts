import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ClientsModule } from '../../clients.module';
import { AuthService } from '../../../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-firstpage',
  templateUrl: './client-firstpage.component.html',
  styleUrl: './client-firstpage.component.css'
})
export class ClientFirstpageComponent {
  constructor(private clientModule: ClientsModule,
    private location: Location,
    private router: Router,
    private auth: AuthService
    ) {}

  activeComponent: 'listar-vehiculos' | 'editar-usuario' | 'historial-vehiculos' | null = null; 

  showComponent(component: 'listar-vehiculos' | 'editar-usuario' | 'historial-vehiculos'): void {
    this.activeComponent = component;
  }
  goBack(): void {
    this.location.back();
  }

  logoff(): void {
    this.auth.logout(); 
    this.router.navigate(['/login']); 
  }

}
