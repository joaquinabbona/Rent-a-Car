import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../interfaces/client.interface';

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
    private router: Router
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

  onDelete(): void {
    this.clientService.deleteClient(this.clientId).subscribe({
      next: () => {
        alert('Cliente eliminado exitosamente');
        this.router.navigate(['/clients']);
      },
      error: (error) => {
        console.error('Error al eliminar el cliente:', error);
        alert('No se pudo eliminar el cliente.');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/clients']);
  }
}
