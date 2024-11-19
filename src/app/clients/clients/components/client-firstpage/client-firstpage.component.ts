import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ClientsModule } from '../../clients.module';

@Component({
  selector: 'app-client-firstpage',
  templateUrl: './client-firstpage.component.html',
  styleUrl: './client-firstpage.component.css'
})
export class ClientFirstpageComponent {
  constructor(private clientModule: ClientsModule,
    private location: Location
    ) {}

  activeComponent: 'listar-vehiculos' | 'editar-usuario' | 'historial-vehiculos' | null = null; 

  showComponent(component: 'listar-vehiculos' | 'editar-usuario' | 'historial-vehiculos'): void {
    this.activeComponent = component;
  }
  goBack(): void {
    this.location.back();
  }


}
