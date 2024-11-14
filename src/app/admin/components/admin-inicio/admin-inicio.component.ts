import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';  // Importar el AuthService

@Component({
  selector: 'app-admin-inicio',
  templateUrl: './admin-inicio.component.html',
  styleUrls: ['./admin-inicio.component.css']
})
export class AdminLoginComponent {
  adminLoginForm: FormGroup;
  error: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService  // Inyectar AuthService
  ) {
    this.adminLoginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.adminLoginForm.valid) {
      const { username, password } = this.adminLoginForm.value;

      // Llamar al servicio de autenticación para admin
      this.authService.loginAdmin(username, password).subscribe(isLoggedIn => {
        if (!isLoggedIn) {
          this.error = 'Nombre de usuario o contraseña incorrectos';
        }
      });
    } else {
      this.error = 'Por favor, complete todos los campos requeridos.';
    }
  }
}
