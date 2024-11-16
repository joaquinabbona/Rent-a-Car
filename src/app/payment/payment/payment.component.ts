import { Component } from '@angular/core';
import { ClientService } from '../../clients/services/client.service';
import { Router } from '@angular/router';
import { PaymentService } from './services/payment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      fullName: [''],
      dni: [''],
      currency: ['ARS'],
      cardName: [''],
      cardNumber: [''],
      expiryDate: [''],
      cvv: ['']
    });
  }





  ngOnInit(): void {
    this.clientId = this.clientService.getLoggedInClientId();
    if (this.clientId = null) {
      this.router.navigate(['/login']);                     // Si no inicio sesion, lo redirige a la pagina de login
    }
     
    this.route.paramMap.subscribe(params => {
     this.carId = params.get('carId');
    });

    this.carService.getCars().subscribe({
      next: (cars) => {
        this.carService.cars = cars;
        this.car = this.carService.cars.find(car => car.id.toString() === this.carId) || null;
      },
      error: (error) => {
        console.error('Error al cargar el coche:', error);
      }
    });


  }

  ngOnSubmit() {
    console.log('Car data:', this.car); // Agrega esto para revisar el valor de `this.car`

    if (this.car?.isForSale) {
      this.payment.savePurchaseInDB().subscribe(response => {
        console.log('Compra todo ok');
      }, error => {
        console.log('Compra todo mal');
      });
    } 
}

  selectPaymentMethod(method: 'cash' | 'card') {
    this.paymentMethod = method;
  }

}
