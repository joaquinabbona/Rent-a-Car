import { Injectable } from '@angular/core';
import { Rental } from '../../../cars/models/rental';
import { Purchase } from '../../../cars/models/purchase';
import { Observable } from 'rxjs';
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





}
