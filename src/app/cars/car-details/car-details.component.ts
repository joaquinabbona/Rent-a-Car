import { Component, OnInit } from '@angular/core';
import { Car } from '../../models/car';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css'
})
export class CarDetailsComponent implements OnInit {

  car: Car | null = null;
  rentalStartDate: string | null = null;
  rentalEndDate: string | null = null

  constructor(private route: ActivatedRoute, private carService: CarService) {}

  ngOnInit(): void {
    const carId = this.route.snapshot.paramMap.get('id');
    
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
  
}
