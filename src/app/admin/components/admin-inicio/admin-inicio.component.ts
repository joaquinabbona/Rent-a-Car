import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

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
    private router: Router
  ) {
    this.adminLoginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.adminLoginForm.valid) {
      const { username, password } = this.adminLoginForm.value;

      // ACA LA LOGICA DE LA VALIDACION
      if (username === 'admin' && password === 'password') {
        // Redirigir al dashboard de administrador o a la página deseada
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.error = 'Nombre de usuario o contraseña incorrectos';
      }
    } else {
      this.error = 'Por favor, complete todos los campos requeridos.';
    }
  }
}