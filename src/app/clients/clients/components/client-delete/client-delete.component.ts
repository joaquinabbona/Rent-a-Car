import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../interfaces/client.interface';
import { Location } from '@angular/common';

@Component({
  selector: 'app-delete-client',
  templateUrl: './client-delete.component.html',
  styleUrls: ['./client-delete.component.css']
})
export class ClientDeleteComponent implements OnInit {
  clientId!: number;
  client?: Client;

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.clientId = Number(this.route.snapshot.paramMap.get('id'));
    this.clientService.getClient(this.clientId).subscribe({
      next: (client) => {
        this.client = client;
      },
      error: (error) => {
        console.error('Error al cargar el cliente:', error);
        alert('No se pudo cargar la información del cliente.');
      }
    });
  }

  onToggleState(): void {
    if (!this.client) return;

    const newState = !this.client.isActive;
    this.clientService.deactivateClient(this.clientId, newState).subscribe({
      next: () => {
        alert(`Cliente ${newState ? 'activado' : 'desactivado'} exitosamente`);
        this.router.navigate(['/clients']);
      },
      error: (error) => {
        console.error('Error al cambiar el estado del cliente:', error);
        alert('No se pudo cambiar el estado del cliente.');
      }
    });
  }

  onCancel(): void {
    this.location.back();
  }
}