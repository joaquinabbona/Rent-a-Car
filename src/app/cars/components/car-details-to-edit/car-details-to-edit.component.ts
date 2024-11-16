import { Component, OnInit } from '@angular/core';
import { Car } from '../../models/car';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-details-to-edit',
  templateUrl: './car-details-to-edit.component.html',
  styleUrl: './car-details-to-edit.component.css'
})
export class CarDetailsToEditComponent implements OnInit {
  
  car: Car | null = null;

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const carId = this.route.snapshot.paramMap.get('id');
    
    this.carService.getCars().subscribe({
      next: (cars) => {
        this.car = cars.find(car => car.id.toString() === carId) || null;
      },
      error: (error) => {
        console.error('Error al cargar el coche:', error);
      }
    });
  }

  editCar(): void {
    this.router.navigate(['/edit-car', this.car?.id]);
  }

  deleteCar(): void {
    if (this.car) {
      if (window.confirm('¿Estás seguro de que quieres eliminar este auto?')) {
        this.carService.deleteCar(this.car.id).subscribe({
          next: () => {
            window.alert('Auto eliminado correctamente');
            this.router.navigate(['/list-to-edit']);
          },
          error: (error: any) => {
            window.alert('Error al eliminar el auto. Inténtalo nuevamente.');
            console.error('Error al eliminar el auto:', error);
          }
        });
      }
    }
  }
}