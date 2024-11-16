import { Component } from '@angular/core';
import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-edit-cars',
  templateUrl: './edit-cars.component.html',
  styleUrl: './edit-cars.component.css'
})

export class EditCarsComponent {
  
  car: Car = {
    id: 0,
    brand: '',
    model: '',
    type: '',
    price: 0,
    year: 0,
    description: '',
    isForSale: true,
    available: true,
    imageUrl: ''
  };
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadCar(id);
    } else {
      this.error = 'ID no válido';
      this.loading = false;
    }
  }

  loadCar(id: number): void {
    this.carService.getCarById(id).subscribe({
      next: (data) => {
        this.car = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar el vehículo';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  onSubmit(): void {
    this.loading = true;
    this.carService.updateCar(this.car).subscribe({
      next: (response) => {
        console.log('Vehículo actualizado exitosamente:', response);
        this.router.navigate(['/cars']); 
      },
      error: (error) => {
        this.error = 'Error al actualizar el vehículo';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }
}
