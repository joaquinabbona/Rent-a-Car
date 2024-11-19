import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { Rental } from '../../../../cars/models/rental';
import { Purchase } from '../../../../cars/models/purchase';

@Injectable({
  providedIn: 'root'
})
export class ClientHistoryService {
  private rentalsUrl = 'http://localhost:3000/rentals';
  private purchasesUrl = 'http://localhost:3000/purchase';
  private carsUrl = 'http://localhost:3000/cars';

  constructor(private http: HttpClient) {}

  getRentalsByClient(clientId: number): Observable<Rental[]> {
    return this.http.get<Rental[]>(`${this.rentalsUrl}?clientId=${clientId}`);
  }

  getPurchasesByClient(clientId: number): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(`${this.purchasesUrl}?clientId=${clientId}`);
  }

  getHistoryByClient(clientId: number): Observable<(Rental | Purchase)[]> {
    return forkJoin({
      rentals: this.getRentalsByClient(clientId),
      purchases: this.getPurchasesByClient(clientId)
    }).pipe(
      map(({ rentals, purchases }) => {
        const history = [...rentals, ...purchases];
        return history;
      })
    );
  }

  getCarById(carId: number): Observable<any> {
    return this.http.get<any>(`${this.carsUrl}/${carId}`);
  }

}
