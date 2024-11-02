import { Component, OnInit } from '@angular/core';
import { Car } from '../car';
import { CarService } from '../services/car.service';
@Component({
  selector: 'app-add-cars',
  templateUrl: './add-cars.component.html',
  styleUrl: './add-cars.component.css'
})
export class AddCarsComponent implements OnInit{
  currentYear: number = new Date().getFullYear();
  
  newCar: Car = {
    id: 0,
    brand: '',
    model: '',
    price: 0,
    year: this.currentYear,
    description: '',
    isForSale: true,
    available: true,
    imageUrl: ''
  };

  constructor(private carService: CarService) {}

  ngOnInit(): void {}
  
  onSubmit() {
    this.carService.addCar(this.newCar).subscribe({
      next: (response) => {
        console.log('Vehículo agregado exitosamente:', response);
        this.resetForm();
      },
      error: (error) => {
        console.error('Error al agregar el vehículo:', error);
      }
    });
  }

  resetForm() {
    this.newCar = {
      id: 0,
      brand: '',
      model: '',
      price: 0,
      year: this.currentYear,
      description: '',
      isForSale: true,
      available: true,
      imageUrl: ''
    };
  }
}
