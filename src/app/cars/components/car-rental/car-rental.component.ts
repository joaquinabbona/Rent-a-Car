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
  pickupDate: Date | null = null; // Fecha de retiro
  dropoffDate: Date | null = null; // Fecha de devolución
  
  selectionMode: 'pickup' | 'dropoff' = 'pickup'; // Modo de selección actual

  constructor(
    private fb: FormBuilder, 
    private distanceCalculator: DistanceCalculatorService,
    private route: ActivatedRoute, 
    private router: Router,
    private authService: AuthService,
    private branchService: BranchService,
    private paymentService: PaymentService) {
      this.carForm = this.fb.group({
      rentalStartDate: ['', Validators.required],
      rentalEndDate: ['', Validators.required],
      originBranch: ['', Validators.required],
      destinationBranch: ['', Validators.required]
      }, { });
  }

  ngOnInit(): void {
    this.today.setHours(0, 0, 0, 0);
    this.generateSixMonths();
  
    const carId = Number(this.route.snapshot.paramMap.get('id'));
    if (carId) {
      this.loadReservations(carId);
    }

    this.updateMinEndDate();
  }
  onStartDateChange(event: any) {
    const startDate = event.target.value;
    this.carForm.patchValue({ rentalStartDate: startDate });
    this.updateMinEndDate();
  }

  onEndDateChange(event: any) {
    const endDate = event.target.value;
    this.carForm.patchValue({ rentalEndDate: endDate });
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
    const formattedDate = date.toISOString().split('T')[0];

    // Compara con la fecha actual y verifica si está en la lista de fechas deshabilitadas
    return this.disabledDates.includes(formattedDate) || date < this.today;
  }

  toggleDateSelection(date: Date): void {
    const formattedDate = date.toISOString().split('T')[0];

    if (this.isDateDisabled(date)) {
      return;
    }

    if (this.selectedDates.includes(formattedDate)) {
      // Si ya está seleccionada, la quitamos
      this.selectedDates = this.selectedDates.filter(d => d !== formattedDate);
    } else {
      // Si no está seleccionada, la añadimos
      this.selectedDates.push(formattedDate);
    }
  }
  


  isSelected(date: Date): boolean {
    const formattedDate = date.toISOString().split('T')[0];
    return this.selectedDates.includes(formattedDate);
  }

  confirmRental(): void {
    if (this.selectedDates.length > 0) {
      // Ordenar las fechas seleccionadas
      const sortedDates = this.selectedDates.map(date => new Date(date)).sort((a, b) => a.getTime() - b.getTime());
  
      // Establecer la primera y última fecha en el formulario
      this.carForm.patchValue({
        rentalStartDate: sortedDates[0].toISOString().split('T')[0],
        rentalEndDate: sortedDates[sortedDates.length - 1].toISOString().split('T')[0],
      });
  
      this.rentalConfirmed = true;
      console.log('Fechas confirmadas para el alquiler:', this.carForm.value);
    } else {
      console.error('No se han seleccionado fechas.');
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
  
    this.paymentService.saveRentalInDB(rental).subscribe({
      next: (response) => {
        console.log('Rental saved successfully:', response);
        alert('¡Alquiler confirmado exitosamente!');
        this.router.navigate(['/rentals']); // Navega a otra página si es necesario.
      },
      error: (error) => {
        console.error('Error saving rental:', error);
        alert('Ocurrió un error al guardar el alquiler. Por favor, intenta de nuevo.');
      },
    });
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
  

  selectDate(date: Date): void {
    if (this.isDateDisabled(date)) {
      return;
    }

    if (this.selectionMode === 'pickup') {
      this.pickupDate = date;
      this.carForm.patchValue({ rentalStartDate: date.toISOString().split('T')[0] });
      this.selectionMode = 'dropoff'; // Cambiar al modo de devolución
    } else if (this.selectionMode === 'dropoff') {
      this.dropoffDate = date;
      this.carForm.patchValue({ rentalEndDate: date.toISOString().split('T')[0] });
    }
  }

  toggleSelectionMode(): void {
    this.selectionMode = this.selectionMode === 'pickup' ? 'dropoff' : 'pickup';
  }
}
  