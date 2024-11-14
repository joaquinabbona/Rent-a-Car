import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any = null;  // Para almacenar los datos del usuario autenticado
  
  constructor(private router: Router) {}

  // Método para login de administradores
  loginAdmin(username: string, password: string): Observable<boolean> {
    if (username === 'admin' && password === 'password') {
      this.currentUser = { role: 'admin', username };  // Establecer al administrador
      this.router.navigate(['/admin/dashboard']);  // Redirigir a dashboard admin
      return of(true);
    }
    return of(false);  // Si las credenciales son incorrectas
  }

  // Método para login de clientes
  loginClient(email: string, password: string): Observable<boolean> {
    // Aquí puedes consultar a tu servicio de clientes para verificar las credenciales
    return this.clientService.login(email, password).pipe(
      map(client => {
        if (client) {
          this.currentUser = { role: 'client', email };
          this.router.navigate(['/home']);  // Redirigir a página de inicio cliente
          return true;
        }
        return false;
      })
    );
  }

  // Obtener el rol actual del usuario
  getCurrentUserRole(): string | null {
    return this.currentUser ? this.currentUser.role : null;
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  // Logout del usuario
  logout(): void {
    this.currentUser = null;
    this.router.navigate(['/login']);
  }
}
