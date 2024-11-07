import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrl: './client-login.component.css'
})
export class ClientLoginComponent {
  
  loginForm: FormGroup;
  errorMessage: string | null = null;
  
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router // Inyecta el servicio Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
  onSubmit() {
    const { username, password } = this.loginForm.value;
  
    this.http.get<any[]>('http://localhost:3000/clients').subscribe(
      (clients) => {
        const client = clients.find(c => c.username === username && c.password === password);
        
        if (client) {
          this.router.navigate(['/home']);
          alert('Login exitoso');
        } else {
          this.errorMessage = 'Usuario o contraseña incorrectos';
        }
      },
      (error) => {
        console.error('Error al cargar clientes:', error);
        this.errorMessage = 'Hubo un problema con el servidor.';
      }
    );
  }
}