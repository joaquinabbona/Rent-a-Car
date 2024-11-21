import { Injectable } from '@angular/core';
import { Rental } from '../../../cars/models/rental';
import { Purchase } from '../../../cars/models/purchase';
import { map, Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  rentalData: Rental | null =null;
  purchaseData: Purchase | null=null;
  private rentalsUrl = 'http://localhost:3000/rentals';
  private purchasesUrl = 'http://localhost:3000/purchase';

  constructor(
    private http: HttpClient
  ) { }



  saveRentalData(rental: Rental){
    this.rentalData=rental;
  }

  getRentalData(){
    return this.rentalData;
  }

  savePurchaseData(purchase: Purchase){
    this.purchaseData=purchase;
  }

  getPurchaseData(){
    return this.purchaseData;
  }



  saveRentalInDB(): Observable<Rental>{
    return this.http.post<Rental>(this.rentalsUrl,this.rentalData);
  }

  savePurchaseInDB(): Observable<Purchase>{
    return this.http.post<Purchase>(this.purchasesUrl,this.purchaseData);
  }

  getReservationsByCarId(carId: number): Observable<Rental[]> {
    const url = `${this.rentalsUrl}?carId=${carId}`;
    return this.http.get<Rental[]>(url);
  }

  cancelReservation(reservationId: number): Observable<any> {
    return this.http.get<Rental[]>(this.rentalsUrl).pipe(
      map((rentals: Rental[]) => {  // Especificamos el tipo de datos esperados
        const rental = rentals.find((r) => r.id === reservationId); // Buscar la reserva por ID
        if (rental) {
          const rentalStartDate = new Date(rental.rentalStartDate); // Convierte la fecha en objeto Date
          if (rentalStartDate > new Date()) {
            // Si la fecha de inicio es posterior a la fecha actual
            return rental.id; // Devuelve solo el ID de la reserva a eliminar
          } else {
            throw new Error('La fecha de inicio ya ha pasado. No se puede cancelar.');
          }
        } else {
          throw new Error('Reserva no encontrada');
        }
      }),
      switchMap((reservationId) => {
        // Si la fecha es válida, se hace la eliminación
        return this.http.delete(`${this.rentalsUrl}/${reservationId}`);
      })
    );
  }




}
