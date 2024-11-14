import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Admin } from '../admin/interfaces/admin';
import { Client } from '../clients/interfaces/client.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private clientApiUrl = 'http://localhost:3000/clients';
  private adminApiUrl = 'http://localhost:3000/admin'; // La URL de admins en tu JSON server
  private loggedInUser: any = null; // Almacenará el usuario (client o admin)

  constructor(private http: HttpClient) {}

  loginClient(email: string, password: string): Observable<boolean> {
    return this.http.get<Client[]>(`${this.clientApiUrl}?email=${email}&password=${password}`).pipe(
      map((clients) => {
        if (clients.length) {
          this.loggedInUser = { ...clients[0], role: 'client' };  // Asignar el rol 'client'
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
