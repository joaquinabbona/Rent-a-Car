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
    this.clientForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        phone: ['', Validators.required],
        address: ['', Validators.required],
        dateOfBirth: ['', Validators.required]
      },
      { validators: this.passwordMatchValidator }
    );
  }
  

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : {'mismatch': true};
  }

  ngOnInit(): void {} 

  onSubmit() {
    if (this.clientForm.valid) {
      const userData = {...this.clientForm.value};
      delete userData.confirmPassword;

      this.clientService.addClient(userData).subscribe({
        next: () => {
          alert('Usuario registrado exitosamente');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error al registrar usuario:', error);
          alert('Error al registrar usuario');
        }
      });
    }
  }
  onCancel(): void {
    this.router.navigate(['/clients']);
  }
}