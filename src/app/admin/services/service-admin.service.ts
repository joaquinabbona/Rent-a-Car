import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Admin } from '../interfaces/admin';
import { map, Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServiceAdminService {
  private apiUrl = 'http://localhost:3000/admin' ///HAY QUE HACERLOOOOO
  private loggedInAdminId: number | null = null;
  constructor(private http: HttpClient) { }

  addAdmin(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(this.apiUrl, admin);
  }

  getAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(this.apiUrl);
  }

  deleteAdmin(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
  login(username: string, password: string): Observable<Admin | null> {
    return this.http.get<Admin[]>(`${this.apiUrl}?username=${username}&password=${password}`).pipe(
      map((admins) => (admins.length ? admins[0] : null)),
      tap((admin) => {
        if (admin) {
          this.loggedInAdminId = admin.id; // Almacena el ID del administrador logueado
        }
      })
    );
  }

  getLoggedInAdminId(): number | null {
    return this.loggedInAdminId; 
  }
}
