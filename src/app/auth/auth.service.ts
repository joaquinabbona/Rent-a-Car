import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Admin } from '../admin/interfaces/admin';
import { Client } from '../clients/interfaces/client.interface';
import { ClientService } from '../clients/services/client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private clientApiUrl = 'http://localhost:3000/clients';
  private adminApiUrl = 'http://localhost:3000/admin'; // La URL de admins en tu JSON server
  private loggedInUser: any = null; // Almacenará el usuario (client o admin)

  constructor(
    private http: HttpClient,
    private clientService: ClientService
  ) {}

  loginClient(email: string, password: string): Observable<boolean> {
    return this.http.get<Client[]>(`${this.clientApiUrl}?email=${email}&password=${password}`).pipe(
      map((clients) => {
        if (clients.length) {
          const client = clients[0];
          if (!client.isActive) {
            // Cliente desactivado, no puede iniciar sesión
            console.warn(`El cliente con email ${email} está desactivado y no puede iniciar sesión.`);
            return false;
          }
          this.loggedInUser = { ...client, role: 'client' }; // Asignar el rol 'client'
          this.clientService.saveLoggedInClientId(this.loggedInUser.id);
          console.log('Cliente logueado, ID:', this.loggedInUser.id); // Debug
          return true;
        }
        return false;
      })
    );
  }
  
  loginAdmin(username: string, password: string): Observable<boolean> {
    return this.http.get<Admin[]>(`${this.adminApiUrl}?username=${username}&password=${password}`).pipe(
      map((admins) => {
        if (admins.length) {
          this.loggedInUser = { ...admins[0], role: 'admin' };  // Asignar el rol 'admin'
          return true;
        }
        return false;
      })
    );
  }

  getCurrentUser(): any {
    return this.loggedInUser;
  }

  getCurrentUserID(): number {
    return this.loggedInUser ? this.loggedInUser.id : null;
  }

  isAuthenticated(): boolean {
    return this.loggedInUser !== null;
  }

  logout(): void {
    this.loggedInUser = null;
  }

  getCurrentUserRole(): string | null {
    return this.loggedInUser ? this.loggedInUser.role : null;
  }
}
