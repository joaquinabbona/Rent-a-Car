// list-cars.component.ts
import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car';

@Component({
  selector: 'app-list-vehicles',
  templateUrl: './list-cars.component.html',
  styleUrl: './list-cars.component.css'
})
export class ListCarsComponent implements OnInit {
  
  constructor(public carService: CarService) {}

  ngOnInit(): void {
    this.carService.loadVehicles();
  }
}