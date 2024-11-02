import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../interfaces/client.interface';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.css']
})
export class ClientAddComponent implements OnInit {
  clientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router
  ) {
    this.clientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      dateOfBirth: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.clientForm.valid) {
      const newClient: Client = this.clientForm.value;
      this.clientService.addClient(newClient).subscribe({
        next: () => {
          alert('Cliente agregado exitosamente');
          this.router.navigate(['/clients']);
        },
        error: (error) => {
          console.error('Error al agregar cliente:', error);
          alert('Error al agregar cliente');
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/clients']);
  }
}