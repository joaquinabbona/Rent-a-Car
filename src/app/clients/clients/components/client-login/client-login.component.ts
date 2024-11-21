import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../auth/auth.service';

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
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Llamada al servicio de autenticación
      this.authService.loginClient(email, password).subscribe({
        next: (isLoggedIn) => {
          if (!isLoggedIn) {
            this.errorMessage =
              'Usuario o contraseña incorrectos, o la cuenta está desactivada.';
          } else {
            // Redirigir al usuario a la página principal o dashboard
            this.router.navigate(['firstpage']);
          }
        },
        error: (err) => {
          console.error('Error durante el inicio de sesión:', err);
          this.errorMessage =
            'Ocurrió un error durante el inicio de sesión. Inténtelo de nuevo más tarde.';
        }
      });
    } else {
      // Mostrar mensaje de error si los campos están incompletos
      this.errorMessage = 'Por favor, complete todos los campos requeridos.';
    }
  }

  
}
