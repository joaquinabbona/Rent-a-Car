import { Component, OnInit } from '@angular/core';
import { Car } from '../../models/car';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../../services/car.service';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup } from '@angular/forms';
import { DistanceCalculatorService } from '../../services/distance-calculator.service';
import { ClientService } from '../../../clients/services/client.service';
import { PaymentService } from '../../../payment/payment/services/payment.service';
import { Rental } from '../../models/rental';
import { Purchase } from '../../models/purchase';



@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css'
})
export class CarDetailsComponent implements OnInit {

  carForm: FormGroup;
  car: Car | null = null;
  rentalStartDate: Date | null = null;
  rentalEndDate: Date | null = null
  distance: string='';
  messagePrice: string='';
  carryPrice:number=0;

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private distanceCalculator: DistanceCalculatorService,
    private clientService: ClientService,
    private paymentService: PaymentService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.carForm = this.fb.group({
      rentalStartDate: [''],
      rentalEndDate: [''],
      destination: ['']
    });
  }

  ngOnInit(): void {
 
    const carId = this.route.snapshot.paramMap.get('id');

    this.carService.saveCarId(Number(carId));

    this.carService.getCars().subscribe({
      next: (cars) => {
        this.carService.cars = cars;  // Actualiza la lista en el servicio
        this.car = this.carService.cars.find(car => car.id.toString() === carId) || null;
      },
      error: (error) => {
        console.error('Error al cargar el coche:', error);
      }
    });
  }

  ngOnSubmit(){
    if(this.car?.rental){
      this.router.navigate(['/car-rental',this.car?.id]);
    }
    if(this.car?.isForSale){
      const purchase: Purchase={
        clientId: this.clientService.getLoggedInClientId()!,
        carId: Number(this.route.snapshot.paramMap.get('id')),
        price: this.car ? this.car.price + this.carryPrice : this.carryPrice
      }
      this.paymentService.savePurchaseData(purchase);
      console.log(purchase);
    }



  }
  
  
}
