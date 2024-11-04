import { Component } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  paymentMethod: 'cash' | 'card' | null=null; 

  selectPaymentMethod(method: 'cash' | 'card') {
    this.paymentMethod = method;
  }

}
