import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrl: './client-login.component.css'
})
export class ClientLoginComponent {
  
  loginForm: FormGroup;
  errorMessage: string | null = null;
  
  constructor(
    private clientService: ClientService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router // Inyecta el servicio Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
  
  onSubmit() {
    const { email, password } = this.loginForm.value;

    // Usa el servicio ClientService para realizar el login
    this.clientService.login(email, password).subscribe(
      (client) => {
        if (client) {
          this.router.navigate(['/home']);  // Redirige a la página de inicio si el login es exitoso
          alert('Login exitoso');
        } else {
          this.errorMessage = 'Usuario o contraseña incorrectos';  // Muestra el mensaje de error si no se encuentra el cliente
        }
      },
      (error) => {
        console.error('Error al cargar clientes:', error);
        this.errorMessage = 'Hubo un problema con el servidor.';
      }
    );
  }
}
