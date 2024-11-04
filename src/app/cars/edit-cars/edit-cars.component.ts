import { Component } from '@angular/core';
import { CarService } from '../services/car.service';
import { Car } from '../car';
@Component({
  selector: 'app-edit-cars',
  templateUrl: './edit-cars.component.html',
  styleUrl: './edit-cars.component.css'
})
export class EditCarsComponent {

  constructor(carService : CarService){}

}
