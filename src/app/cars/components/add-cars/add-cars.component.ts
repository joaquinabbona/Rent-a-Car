import { Component, OnInit } from '@angular/core';
import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';
import { Location } from '@angular/common';

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
    type:'',
    price: 0,
    year: this.currentYear,
    description: '',
    isForSale: true,
    rental: true,
    imageUrl: '',
    branchId: 3
  };

  constructor(private carService: CarService,
    private location: Location
  ) {}

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
      type:'',
      price: 0,
      year: this.currentYear,
      description: '',
      isForSale: true,
      rental: true,
      imageUrl: '',
      branchId: 3
    };
  }
  goBack(): void {
    this.location.back();
  }
}
