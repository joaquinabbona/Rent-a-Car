import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';  // Importar el AuthService

@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.css']
})
export class ClientLoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService  // Inyectar AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Llamar al servicio de autenticación para cliente
      this.authService.loginClient(email, password).subscribe(isLoggedIn => {
        if (!isLoggedIn) {
          this.errorMessage = 'Usuario o contraseña incorrectos';
        }
      });
    } else {
      this.errorMessage = 'Por favor, complete todos los campos requeridos.';
    }
  }
}
