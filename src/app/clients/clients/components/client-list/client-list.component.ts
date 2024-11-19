import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../interfaces/client.interface';

@Component({
  selector: 'app-list-clients',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService.getClients().subscribe({
      next: (data) => {
        this.clients = data;
      },
      error: (error) => {
        console.error('Error al obtener clientes:', error);
      }
    });
  }
  onToggleState(client: Client): void {
    const newState = !client.isActive;
    this.clientService.deactivateClient(client.id, newState).subscribe({
      next: () => {
        client.isActive = newState; // Actualiza el estado en la lista
      },
      error: (error) => {
        console.error('Error al cambiar el estado del cliente:', error);
        alert('No se pudo cambiar el estado del cliente.');
      }
    });
  }
}
