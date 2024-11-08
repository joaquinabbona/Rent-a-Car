import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../../../services/client.service';


@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrl: './client-login.component.css'
})
export class ClientLoginComponent {
  userLoginForm: FormGroup;
  error: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private clientService: ClientService
  ) {
    this.userLoginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  onSubmit(): void {
    if (this.userLoginForm.valid) {
      const { email, password } = this.userLoginForm.value;
  
      this.clientService.login(email, password).subscribe(
        (client) => {
          if (client) {
            this.router.navigate(['/']);
          } else {
            this.error = 'Correo electrónico o contraseña incorrectos';
          }
        },
        (error) => {
          this.error = 'Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.';
        }
      );
    } else {
      this.error = 'Por favor, complete todos los campos requeridos.';
    }
  }
}