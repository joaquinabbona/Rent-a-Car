import { Component, OnInit } from '@angular/core';
import { CarsModule } from '../cars.module';
import { CarService } from '../services/car.service';
import { Car } from '../models/car';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DistanceCalculatorService } from '../services/distance-calculator.service';
import { ClientService } from '../../clients/services/client.service';
import { PaymentService } from '../../payment/payment/services/payment.service';
import { Rental } from '../models/rental';
import { Purchase } from '../models/purchase';

@Component({
  selector: 'app-car-rental',
  templateUrl: './car-rental.component.html',
  styleUrl: './car-rental.component.css'
})
export class CarRentalComponent implements OnInit {
  carForm: FormGroup;
  branches = ['Mar del Plata', 'Córdoba', 'Bariloche'];
  minEndDate: string = '';
  distance: string='';
  messagePrice: string='';
  carryPrice:number=0;

  constructor(private fb: FormBuilder, private distanceCalculator: DistanceCalculatorService) {
    this.carForm = this.fb.group({
      rentalStartDate: ['', Validators.required],
      rentalEndDate: ['', Validators.required],
      originBranch: ['', Validators.required],
      destinationBranch: ['', Validators.required]
    }, { validator: this.endDateAfterStartDateValidator });
  }

  ngOnInit(): void {
    this.carForm.get('rentalStartDate')?.valueChanges.subscribe((startDate) => {
      this.minEndDate = startDate;
      this.carForm.get('rentalEndDate')?.updateValueAndValidity();
    });
  }

  endDateAfterStartDateValidator(group: FormGroup) {
    const startDate = group.get('rentalStartDate')?.value;
    const endDate = group.get('rentalEndDate')?.value;
    return startDate && endDate && endDate >= startDate ? null : { endDateInvalid: true };
  }

  onSubmit() {
    
  }

  calculateDistanceAndCarryPrice(origins: string, destination:string):void{
    this.distanceCalculator.getDistance(origins,destination).subscribe(response =>{
      const dist= response.rows[0].elements[0].distance.text;
      this.distance= `La distancia total es  ${dist}`;
      this.carryPrice= parseFloat(dist)*30;
      this.messagePrice=`El precio del acarreo es de ${this.carryPrice}`   
    });
  }
  
}