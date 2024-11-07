import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  paymentMethod: 'cash' | 'card' | null=null; 
  paymentForm : FormGroup

  selectPaymentMethod(method: 'cash' | 'card') {
    this.paymentMethod = method;
  }
  constructor(
    private fb: FormBuilder,
  ){
    this.paymentForm = this.fb.group({
      fullName : ['Nombre Completo', Validators.required]
    })
  }

  ngOnInit(): void {}

} 
