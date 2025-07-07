import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DistanceCalculatorService } from '../../services/distance-calculator.service';
import { PaymentService } from '../../../payment/payment/services/payment.service'; 
import { Rental } from '../../models/rental';
import { AuthService } from '../../../auth/auth.service';
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
  minDate: string = '';
  errorEndDate: boolean = false;
  calendarMonths: { label: string; dates: Date[] }[] = [];
  disabledDates: string[] = [];
  selectedDates: string[] = [];
  rentalConfirmed: boolean = false;
  today: Date = new Date();
  datesConfirmed: boolean = false;
  isSelectingStartDate: boolean = true;
  selectedStartDate: string | null = null;
  selectedEndDate: string | null = null;
  rentalSummary: {
    days: number;
    startDate: string;
    endDate: string;
  } | null = null;
  branchID: number=0;
  originBranchName: string = '';
  startDateConfirmed: boolean = false;



  constructor(
    private fb: FormBuilder, 
    private distanceCalculator: DistanceCalculatorService,
    private route: ActivatedRoute, 
    private router: Router,
    private authService: AuthService,
    private branchService: BranchService,
    private carService: CarService,
    private paymentService: PaymentService) {
      this.carForm = this.fb.group({
      rentalStartDate: ['', Validators.required],
      rentalEndDate: ['', Validators.required],
      destinationBranch: ['', Validators.required]
      }, { });
  }

  ngOnInit(): void {
    const carId = Number(this.route.snapshot.paramMap.get('id'));

    this.carService.getCarById(carId).subscribe((car: Car) => {
      if (car.branchId) {
        this.branchService.getBranchById(car.branchId).subscribe((branch: Branch) => {
      this.originBranchName = branch.city; // Asume que `branch.name` es el atributo que contiene el nombre.
    });
      } else {
        console.error('El automóvil no tiene branchId asociado.');
      }
    });
    

    this.today.setHours(0, 0, 0, 0);
    this.generateSixMonths();
  
    
    if (carId) {
      this.loadReservations(carId);
    }

    this.updateMinEndDate();
  }

  onStartDateChange(startDate: Date): void {
    const startDateControl = this.carForm.get('rentalStartDate');
    if (!startDateControl) {
      console.error('Control rentalStartDate no inicializado');
      return;
    }
  
    
    startDateControl.setValue(startDate.toISOString().split('T')[0]);
  
    console.log('Fecha de inicio actualizada:', startDate);
  }

  onEndDateChange(endDate: Date): void {
    console.log('Fecha recibida en onEndDateChange:', endDate);
  
    
    const endDateControl = this.carForm.get('rentalEndDate');
    if (!endDateControl) {
      console.error('Control rentalEndDate no inicializado');
      return;
    }
  
   
    endDateControl.setValue(endDate.toISOString().split('T')[0]);
  
    console.log('Fecha de devolución actualizada:', endDate);
  }
  

  updateMinEndDate() {
    const startDate = this.carForm.value.rentalStartDate;
    if (startDate) {
      this.minEndDate = startDate;
    }
  }

  loadReservations(carId: number): void {
    this.paymentService.getReservationsByCarId(carId).subscribe({
      next: (reservations) => {
        // Extraer las fechas reservadas y agregarlas a `disabledDates`
        const reservedDates = reservations.flatMap(reservation =>
          this.generateDatesInRange(
            new Date(reservation.rentalStartDate),
            new Date(reservation.rentalEndDate)
          ).map(date => date.toISOString().split('T')[0])
        );
  
        this.disabledDates = [...this.disabledDates, ...reservedDates];
        console.log('Fechas deshabilitadas:', this.disabledDates);
      },
      error: (error) => {
        console.error('Error al cargar las reservas:', error);
      }
    });
  }
  
  generateSixMonths(): void {
    const today = new Date();
    this.calendarMonths = [];

    for (let i = 0; i < 6; i++) {
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth() + i, 1);
      const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + i + 1, 0);
      const monthDates = this.generateDatesInRange(firstDayOfMonth, lastDayOfMonth);

      this.calendarMonths.push({
        label: firstDayOfMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }),
        dates: monthDates,
      });
    }
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

  generateDatesInRange(startDate: Date, endDate: Date): Date[] {
    const dates: Date[] = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }

  isDateDisabled(date: Date): boolean {
  const formattedDate = date.toISOString().split('T')[0]; // yyyy-MM-dd

  const todayStr = new Date().toISOString().split('T')[0];

  // Deshabilitar fechas pasadas
  if (formattedDate < todayStr) {
    return true;
  }

  // Deshabilitar fechas reservadas
  if (this.disabledDates.includes(formattedDate)) {
    return true;
  }

  // Si estás seleccionando fecha de devolución
  if (!this.isSelectingStartDate && this.selectedStartDate) {
    const startStr = this.selectedStartDate;

    if (formattedDate < startStr) {
      return true; // ✅ No dejar seleccionar una devolución antes del retiro
    }
  }

  return false;
}



  toggleDateSelection(date: Date): void {
  const formattedDate = date.toISOString().split('T')[0];

  if (this.isDateDisabled(date)) {
    return;
  }

  if (this.isSelectingStartDate) {
    this.selectedStartDate = formattedDate;
    this.carForm.patchValue({ rentalStartDate: formattedDate });
    this.onStartDateChange(date);

    // Cambiar automáticamente a modo devolución
    this.isSelectingStartDate = false;
  } else {
    this.selectedEndDate = formattedDate;
    this.carForm.patchValue({ rentalEndDate: formattedDate });
    this.onEndDateChange(date);
  }
}


  switchSelectionMode(): void {
    this.isSelectingStartDate = !this.isSelectingStartDate;
  }
  
  


  isSelected(date: Date): boolean {
    const formattedDate = date.toISOString().split('T')[0];
    return this.selectedDates.includes(formattedDate);
  }

  confirmRental(): void {
    if (this.selectedStartDate && this.selectedEndDate) {
      this.carForm.patchValue({
        rentalStartDate: this.selectedStartDate,
        rentalEndDate: this.selectedEndDate,
      });
      this.datesConfirmed = true;
      this.rentalConfirmed = true;
      console.log('Fechas confirmadas para el alquiler:', this.carForm.value);
    } else {
      console.error('No se han seleccionado ambas fechas.');
    }
  }  
  

  ngOnSubmit(event: Event): void {
    event.preventDefault();
  
    if (this.carForm.invalid) {
      console.error('Formulario inválido. Por favor, completa todos los campos.');
      return;
    }
  
    const rental: Rental = {
      clientId: this.authService.getCurrentUserID(),
      carId: Number(this.route.snapshot.paramMap.get('id')),
      rentalStartDate: new Date(this.carForm.get('rentalStartDate')?.value),
      rentalEndDate: new Date(this.carForm.get('rentalEndDate')?.value),
      price: this.totalPrice,
      originBranch: this.carForm.get('originBranch')?.value,
      destinationBranch: this.carForm.get('destinationBranch')?.value,
    };

    this.paymentService.saveRentalData(rental);
    console.log(rental);
    this.router.navigate(['/payment', Number(this.route.snapshot.paramMap.get('id'))]);

    
  }
  

  calculateDistanceAndCarryPrice(destination: string): Observable<number> {
    return new Observable(observer => {
      this.distanceCalculator.getDistance(this.originBranchName, destination).subscribe(response => {
        const dist = response.rows[0].elements[0].distance.text;
        this.distance = `La distancia total es ${dist}`;
  
        
        if (this.originBranchName === destination) {
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
  
          observer.next(rentalPrice);  
          observer.complete();
        } else {
          this.totalPrice = 0;
          observer.next(0);  
          observer.complete();
        }
      });
    });
  }

onCalculatePrice(): void {
  const origin = this.carForm.get('originBranch')?.value;
  const destination = this.carForm.get('destinationBranch')?.value;

  this.calculateDistanceAndCarryPrice(destination).subscribe(totalPrice => {
    console.log('Precio total calculado:', totalPrice);

    this.totalPrice = totalPrice;

    // Calcular la cantidad de días y generar el resumen
    const rentalStartDate = this.carForm.get('rentalStartDate')?.value;
    const rentalEndDate = this.carForm.get('rentalEndDate')?.value;

    if (rentalStartDate && rentalEndDate) {
      const startDate = new Date(rentalStartDate);
      const endDate = new Date(rentalEndDate);

      const timeDiff = endDate.getTime() - startDate.getTime();
      const numDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

      this.rentalSummary = {
        days: numDays,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
      };

      console.log('Resumen del alquiler:', this.rentalSummary);
    }
  });
}

setSelectionMode(selectingStart: boolean): void {
  this.isSelectingStartDate = selectingStart;
}

isInRange(date: Date): boolean {
  if (!this.selectedStartDate || !this.selectedEndDate) return false;

  const current = date.toISOString().split('T')[0];
  return current > this.selectedStartDate && current < this.selectedEndDate;
}


  
}
  