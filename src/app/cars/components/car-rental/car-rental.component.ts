import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DistanceCalculatorService } from '../../services/distance-calculator.service';
import { PaymentService } from '../../../payment/payment/services/payment.service'; 
import { Rental } from '../../models/rental';
import { Branch } from '../../models/branch';
import { BranchService } from '../../services/branch.service';

@Component({
  selector: 'app-car-rental',
  templateUrl: './car-rental.component.html',
  styleUrl: './car-rental.component.css'
})
export class CarRentalComponent implements OnInit {
  carForm: FormGroup;
  branches: Branch[] = []; 
  minEndDate: string = '';
  distance: string='';
  messagePrice: string='';
  carryPrice:number=0;
  daysMessage: string='';
  auxTotalPrice: string='';
  totalPrice: number=0;
  car: any;
  clientService: any;
  someFormControlValue: string='';

  constructor(
    private fb: FormBuilder, 
    private distanceCalculator: DistanceCalculatorService,
    private route: ActivatedRoute, 
    private router: Router,
    private branchService: BranchService,
    private paymentService: PaymentService) {
      this.carForm = this.fb.group({
      rentalStartDate: ['', Validators.required],
      rentalEndDate: ['', Validators.required],
      originBranch: ['', Validators.required],
      destinationBranch: ['', Validators.required]
      }, { validator: this.endDateAfterStartDateValidator });
  }

  ngOnInit(): void {
    this.loadBranches();
    this.carForm.get('rentalStartDate')?.valueChanges.subscribe((startDate) => {
      this.minEndDate = startDate;
      this.carForm.get('rentalEndDate')?.updateValueAndValidity();
    });
  }

  loadBranches(): void {
    this.branchService.getBranches().subscribe({
      next: (data) => {
        this.branches = data;
      },
      error: (err) => {
        console.error('Error al cargar las sucursales:', err);
      }
    });
  }

  endDateAfterStartDateValidator(group: FormGroup) {
    const startDate = group.get('rentalStartDate')?.value;
    const endDate = group.get('rentalEndDate')?.value;
    return startDate && endDate && endDate >= startDate ? null : { endDateInvalid: true };
  }

  ngOnSubmit(event: Event){
    event.preventDefault();
    if(!this.car?.rental){
      const rental: Rental={
        clientId: 1,
        carId: Number(this.route.snapshot.paramMap.get('id')),
        rentalStartDate : this.carForm.get('rentalStartDate')?.value,
        rentalEndDate : this.carForm.get('rentalEndDate')?.value,
        price: this.totalPrice,
        originBranch: this.carForm.get('originBranch')?.value,
        destinationBranch: this.carForm.get('destinationBranch')?.value
      } 
    this.paymentService.saveRentalInDB(rental).subscribe({
      next: (response) => {
        console.log('Rental saved successfully:', response);
      },
      error: (error) => {
        console.error('Error saving rental:', error);
      }
    });
      }
      
    
  }

  calculateDistanceAndCarryPrice(origins: string, destination: string): Observable<number> {
    return new Observable(observer => {
      this.distanceCalculator.getDistance(origins, destination).subscribe(response => {
        const dist = response.rows[0].elements[0].distance.text;
        this.distance = `La distancia total es ${dist}`;
  
        
        if (origins === destination) {
          this.carryPrice = 0;
        } else {
          this.carryPrice = parseFloat(dist) * 5;
        }
  
        this.messagePrice = `El precio del acarreo es de $${this.carryPrice.toLocaleString()}`;
  
        
        const rentalStartDate = this.carForm.get('rentalStartDate')?.value;
        const rentalEndDate = this.carForm.get('rentalEndDate')?.value;
  
        if (rentalStartDate && rentalEndDate) {
          const startDate = new Date(rentalStartDate);
          const endDate = new Date(rentalEndDate);
          
          startDate.setHours(0, 0, 0, 0);
          endDate.setHours(0, 0, 0, 0);
          
          const timeDiff = endDate.getTime() - startDate.getTime();
          const numDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
          const rentalPrice = this.carryPrice + (numDays * 10000); 

          this.daysMessage = `Dias seleccionados: `+ numDays;

          this.auxTotalPrice = `El precio total del alquiler es de $${rentalPrice.toLocaleString()}`;
  
          observer.next(rentalPrice);  // Emitir el precio total calculado
          observer.complete();
        } else {
          this.totalPrice = 0;
          observer.next(0);  // Si no hay fechas, se devuelve 0 como precio
          observer.complete();
        }
      });
    });
  }
  onCalculatePrice(): void {
    const origin = this.carForm.get('originBranch')?.value;
    const destination = this.carForm.get('destinationBranch')?.value;
  
    this.calculateDistanceAndCarryPrice(origin, destination).subscribe(totalPrice => {
      
      console.log('Precio total calculado:', totalPrice);
  
      
      this.totalPrice = totalPrice;
    });
  }
  
  
}