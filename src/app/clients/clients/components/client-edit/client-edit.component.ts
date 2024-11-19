import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../interfaces/client.interface';
import { AuthService } from '../../../../auth/auth.service';



@Component({
  selector: 'app-edit-client',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class EditClientComponent implements OnInit {
  clientForm: FormGroup;
  clientId!: number;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {
    // Inicializamos el formulario sin los campos de contraseña
    this.clientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      dateOfBirth: ['', Validators.required]
    });
  }

  isLoading = true; // Nueva variable de estado

  ngOnInit(): void {

    const userRole = this.auth.getCurrentUser()?.role
    if (userRole === 'admin') {
  
      this.clientId = Number(this.route.snapshot.paramMap.get('id'));

    } else {
          // Obtener el clientId de la URL
          this.clientId = this.auth.getCurrentUser()?.id || 0; // Si no está logueado, ponemos 0 como fallback
          console.log('ID del cliente logueado:', this.clientId); // Debug
    }

  
    if (isNaN(this.clientId)) {
      console.error('El clientId obtenido de la URL no es válido');
      this.router.navigate(['/clients']);
      return;
    }
     // Cargar los datos del cliente desde el servicio
     this.clientService.getClient(this.clientId).subscribe({
      next: (client) => {
        console.log('Cliente recibido:', client);

        // Rellenar el formulario con los datos
        this.clientForm.patchValue(client);

        this.isLoading = false; // Marcar como listo
      },
      error: (error) => {
        console.error('Error al cargar el cliente:', error);
        alert('Error al cargar los datos del cliente.');
        this.isLoading = false; // Marcar como listo aunque falle
      }
    });
  }
  
  onSubmit(): void {
    if (this.clientForm.valid) {
      const updatedClient = this.clientForm.value;
      updatedClient.id = this.clientId;

      // Actualizamos el cliente sin enviar la contraseña
      this.clientService.updateClient(this.clientId, updatedClient).subscribe({
        next: () => {
          alert('Cliente actualizado exitosamente');
          this.router.navigate(['/clients']);
        },
        error: (error) => {
          console.error('Error al actualizar el cliente:', error);
          alert('Error al actualizar el cliente');
        }
      });
    } else {
      alert('Por favor, complete todos los campos requeridos.');
    }
  }

  onCancel(): void {
    this.router.navigate(['/clients']);
  }
}