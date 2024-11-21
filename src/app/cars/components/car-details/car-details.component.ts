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
import { Location } from '@angular/common';
import { BranchService } from '../../services/branch.service';
import { Branch } from '../../models/branch';



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
  branchCity: string = '';
  
  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private distanceCalculator: DistanceCalculatorService,
    private clientService: ClientService,
    private paymentService: PaymentService,
    private fb: FormBuilder,
    private router: Router,
    private branchService: BranchService,
    private location: Location
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
        this.carService.cars = cars;
        const car = this.carService.cars.find(car => car.id.toString() === carId);
        
        if (car) {
          this.carService.getCarById(car.id).subscribe((fullCar: Car) => {
            this.car = fullCar;
            
            if (fullCar.branchId) {
              this.branchService.getBranchById(fullCar.branchId).subscribe((branch: Branch) => {
                this.branchCity = branch.city;
              });
            }
          });
        }
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
      this.router.navigate(['/payment',this.car?.id]);
    }



  }
  
  goBack(): void {
    this.location.back();
  }
  
}
