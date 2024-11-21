import { Component } from '@angular/core';
import { ClientService } from '../../clients/services/client.service';
import { Router } from '@angular/router';
import { PaymentService } from './services/payment.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Car } from '../../cars/models/car';
import { CarService } from '../../cars/services/car.service';
import { ActivatedRoute } from '@angular/router';
import { BranchService } from '../../cars/services/branch.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  paymentForm: FormGroup;
  car?: Car;
  paymentMethod: 'cash' | 'card' | null = null;
  clientId: number | null = null;
  carId: string | null = null;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private payment: PaymentService,
    private fb: FormBuilder,
    private branchService: BranchService,
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
        this.saveTransaction();
      } else if (this.paymentMethod === 'card' && this.paymentForm.get('cardPayment')?.valid) {
        this.saveTransaction();
      } else {
        console.log('Formulario inválido');
      }
    }
    
    private saveTransaction(): void {
      const carId = this.route.snapshot.paramMap.get('id');
      console.log('CAR ID:ESTOY EN PAYMENT', carId);
    
      this.carService.getCarById(Number(carId)).subscribe({
        next: (car) => {
          this.car = car;
          console.log('Auto leido en payment: ', this.car);
    
          if (this.car.isForSale) {
            console.log('SE VENDE');
            this.payment.savePurchaseInDB().subscribe({
              next: (response) => {
                this.router.navigate(['/payment-success']);
                console.log('Purchase saved successfully:', response);
                this.carService.deleteCar(car.id).subscribe({
                  next: () => {
                    console.log('Car deleted');
                  }
                })
              },
              error: (error) => {
                console.error('Error saving purchase:', error);
              }
            });
          } else {
            console.log('SE alquila');
            this.payment.saveRentalInDB().subscribe({
              next: (response) => {
                const rental = this.payment.getRentalData();
                
                if (rental?.destinationBranch) {
                  this.branchService.getBranchByName(rental.destinationBranch).subscribe({
                    next: (branch) => {
                      this.carService.updateCarBranch(Number(carId), Number(branch.id)).subscribe({
                        next: (updatedCar) => {
                          this.router.navigate(['/payment-success']);
                          console.log('Rental and car branch updated successfully:', updatedCar);
                        },
                        error: (error) => {
                          console.error('Error updating car branch:', error);
                        }
                      });
                    },
                    error: (error) => {
                      console.error('Error finding branch:', error);
                    }
                  });
                }
              },
              error: (error) => {
                console.error('Error saving rental:', error);
              }
            });
          }
        }
      });
    }


  selectPaymentMethod(method: 'cash' | 'card') {
    this.paymentMethod = method;
  }

  redirectToFirstPage(): void {
    alert('¡Alquiler confirmado exitosamente!');
    this.router.navigate(['/firstpage']);
  }

  checkSubmit(): void {
    if (this.car?.rental) {
      
      console.log("El auto es de alquiler, no se ejecuta ngOnSubmit.");
      this.redirectToFirstPage();
      return;
    }
  
    this.ngOnSubmit(); 
  }

}
