import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Admin } from '../interfaces/admin';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServiceAdminService {
  private apiUrl = 'http://localhost:3000/admin' ///HAY QUE HACERLOOOOO

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
  
}
