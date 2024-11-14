import { Component } from '@angular/core';
import { ClientService } from '../../../clients/services/client.service';
import { Client } from '../../../clients/interfaces/client.interface';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-gestion-clientes',
  templateUrl: './admin-gestion-clientes.component.html',
  styleUrl: './admin-gestion-clientes.component.css'
})
export class AdminGestionClientesComponent {
  constructor(private clientService: ClientService,
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
