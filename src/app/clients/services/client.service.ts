import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap, tap } from 'rxjs';
import { Client } from '../interfaces/client.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private url = 'http://localhost:3000/clients';//ACA VA EL JSON SERVER DE CLIENTES
  private loggedInClientId: number=0;

  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.url);
  }

  getClient(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.url}/${id}`);
  }
  
  

  addClient(client: Client): Observable<Client> {
    return this.getClients().pipe(
      map((clients) => {
        const nextId = clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1;
        return { ...client, id: nextId }; 
      }),
      switchMap(newClient => this.http.post<Client>(this.url, newClient))
    );
  }

  updateClient(id: number, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.url}/${id}`, client);
  }

  deactivateClient(id: number, isActive: boolean): Observable<void> {
    return this.getClient(id).pipe(
      switchMap((client) => {
        const updatedClient = { ...client, isActive }; // Cambia el estado
        return this.http.put<void>(`${this.url}/${id}`, updatedClient);
      })
    );
  }
  login(email: string, password: string): Observable<Client | null> {
    return this.http.get<Client[]>(`${this.url}?email=${email}&password=${password}`).pipe(
      map((clients) => (clients.length ? clients[0] : null)),
      tap((client) => {
        if (client) {
          this.loggedInClientId = client.id; 
          console.log('Cliente logueado, ID:', this.loggedInClientId); // Debug
        }
      })
    );
  }

  getLoggedInClientId(): number | null {
    return this.loggedInClientId; 
  }
  saveLoggedInClientId(id:number){
    this.loggedInClientId=id;
  }

  isEmailinUse(email: string): Observable<boolean> {
    return this.http.get<Client[]>(this.url).pipe(
      map((clients) => clients.some((client) => client.email === email))
    );
  }
}