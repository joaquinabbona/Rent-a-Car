import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SavePaymentService } from '../services/save-payment-service.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  paymentMethod: 'cash' | 'card' = 'cash';
  transactionType: 'purchase' | 'rental' = 'purchase'; // Definir si es compra o alquiler

  constructor(private fb: FormBuilder, private savePaymentService: SavePaymentService) {
    this.paymentForm = this.fb.group({
      fullName: ['', Validators.required],
      dni: ['', Validators.required],
      currency: ['ARS', Validators.required],
      cardNumber: [{ value: '', disabled: true }, Validators.required],
      expiryDate: [{ value: '', disabled: true }, Validators.required],
      cvv: [{ value: '', disabled: true }, Validators.required],
    });
  }

  ngOnInit(): void {}

  selectPaymentMethod(method: 'cash' | 'card') {
    this.paymentMethod = method;
    if (method === 'cash') {
      this.paymentForm.get('cardNumber')?.disable();
      this.paymentForm.get('expiryDate')?.disable();
      this.paymentForm.get('cvv')?.disable();
      this.paymentForm.get('dni')?.enable();
      this.paymentForm.get('currency')?.enable();
    } else {
      this.paymentForm.get('cardNumber')?.enable();
      this.paymentForm.get('expiryDate')?.enable();
      this.paymentForm.get('cvv')?.enable();
      this.paymentForm.get('dni')?.disable();
      this.paymentForm.get('currency')?.disable();
    }
  }

  // Método para cambiar el tipo de transacción a compra o alquiler
  setTransactionType(type: 'purchase' | 'rental') {
    this.transactionType = type;
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      const paymentData = this.paymentForm.value;

      if (this.transactionType === 'purchase') {
        this.savePaymentService.savePurchase(paymentData).subscribe(
          response => console.log('Compra guardada:', response),
          error => console.error('Error al guardar la compra:', error)
        );
      } else if (this.transactionType === 'rental') {
        this.savePaymentService.saveRental(paymentData).subscribe(
          response => console.log('Alquiler guardado:', response),
          error => console.error('Error al guardar el alquiler:', error)
        );
      }
    } else {
      console.log('Formulario no válido');
    }
  }
}
