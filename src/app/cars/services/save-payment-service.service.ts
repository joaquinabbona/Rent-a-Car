import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SavePaymentService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  savePurchase(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/purchases`, data);
  }

  saveRental(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/rentals`, data);
  }
}
