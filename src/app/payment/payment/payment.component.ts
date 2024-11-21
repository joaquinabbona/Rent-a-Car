import { Component } from '@angular/core';
import { ClientService } from '../../clients/services/client.service';
import { Router } from '@angular/router';
import { PaymentService } from './services/payment.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Car } from '../../cars/models/car';
import { CarService } from '../../cars/services/car.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  paymentForm: FormGroup;
  car: Car | null = null;
  paymentMethod: 'cash' | 'card' | null = null;
  clientId: number | null = null;
  carId: string | null = null;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private payment: PaymentService,
    private fb: FormBuilder,
    private carService: CarService,
    private route: ActivatedRoute

  ) {
    this.paymentForm = this.fb.group({
      paymentMethod: ['', Validators.required],
      cashPayment: this.fb.group({
        fullName: [''],
        dni: [''],
        currency: ['ARS']
      }),
      cardPayment: this.fb.group({
        cardName: [''],
        cardNumber: [''],
        expiryDate: [''],
        cvv: ['']
      })
    });
  }





  ngOnInit(): void {
    this.paymentForm.get('paymentMethod')?.valueChanges.subscribe(method => {
      if (method === 'cash') {
        this.setCashPaymentValidations();
      } else if (method === 'card') {
        this.setCardPaymentValidations();
      }
    });
  }
  
  setCashPaymentValidations(): void {
    const cashGroup = this.paymentForm.get('cashPayment') as FormGroup;

    // Validaciones para el pago en efectivo
    cashGroup.get('fullName')?.setValidators([
      Validators.required,
      Validators.minLength(3) // Longitud mínima de 3 caracteres
    ]);
    cashGroup.get('dni')?.setValidators([
      Validators.required,
      Validators.minLength(7), // Longitud mínima de 7 caracteres para DNI
      Validators.pattern('^[0-9]*$') // Solo números
    ]);
    cashGroup.get('currency')?.setValidators([Validators.required]);

    // Limpiar validaciones del grupo de pago con tarjeta
    const cardGroup = this.paymentForm.get('cardPayment') as FormGroup;
    cardGroup.get('cardName')?.clearValidators();
    cardGroup.get('cardNumber')?.clearValidators();
    cardGroup.get('expiryDate')?.clearValidators();
    cardGroup.get('cvv')?.clearValidators();

    cashGroup.updateValueAndValidity();
    cardGroup.updateValueAndValidity();
  }
  
  setCardPaymentValidations(): void {
    const cardGroup = this.paymentForm.get('cardPayment') as FormGroup;
    cardGroup.get('cardName')?.setValidators([Validators.required]);
    cardGroup.get('cardNumber')?.setValidators([
      Validators.required,
      Validators.pattern(/^\d{16}$/)
    ]);
    cardGroup.get('expiryDate')?.setValidators([
      Validators.required,
      Validators.pattern(/^(0[1-9]|1[0-2])\/\d{4}$/),
      this.expiryDateValidator
    ]);
    cardGroup.get('cvv')?.setValidators([
      Validators.required,
      Validators.pattern(/^\d{3}$/)
    ]);
  
    const cashGroup = this.paymentForm.get('cashPayment') as FormGroup;
    cashGroup.get('fullName')?.clearValidators();
    cashGroup.get('dni')?.clearValidators();
    cashGroup.get('currency')?.clearValidators();
  
    cardGroup.updateValueAndValidity();
    cashGroup.updateValueAndValidity();
  }

    // Validador personalizado para verificar que la fecha de expiración no sea anterior al mes actual
    expiryDateValidator(control: AbstractControl): ValidationErrors | null {
      const expiryValue = control.value;
      if (!expiryValue) return null;
  
      const [month, year] = expiryValue.split('/').map(Number);
      if (!month || !year) return { invalidDate: true }; // Verificar que la fecha tenga formato correcto
  
      const today = new Date();
      const currentMonth = today.getMonth() + 1; // Los meses en JavaScript son base 0
      const currentYear = today.getFullYear();
  
      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        return { expired: true };
      }
  
      return null;
    }

  ngOnSubmit(): void {
    if (this.paymentMethod === 'cash' && this.paymentForm.get('cashPayment')?.valid) {
      this.payment.savePurchaseInDB().subscribe({
        next: (response) => {
          console.log('Purchase saved successfully:', response);
        },
        error: (error) => {
          console.error('Error saving purchase:', error);
        }
      });
    } else if (this.paymentMethod === 'card' && this.paymentForm.get('cardPayment')?.valid) {
      this.payment.savePurchaseInDB().subscribe({
        next: (response) => {
          console.log('Purchase saved successfully:', response);
        },
        error: (error) => {
          console.error('Error saving purchase:', error);
        }
      });
    } else {
      console.log('Formulario inválido');
    }
  }


  selectPaymentMethod(method: 'cash' | 'card') {
    this.paymentMethod = method;
  }

}
