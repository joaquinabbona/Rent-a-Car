import { Component, OnInit } from '@angular/core';
import { Car } from '../car';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../services/car.service';
import { DistanceCalculatorService } from '../services/distance-calculator.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css'
})
export class CarDetailsComponent implements OnInit {

  car: Car | null = null;
  rentalStartDate: string | null = null;
  rentalEndDate: string | null = null
  distance: string='';
  messagePrice: string='';
  carryPrice:number=0;

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private distanceCalculator: DistanceCalculatorService
  ) {}

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

  calculateDistanceAndCarryPrice(destination:string):void{
    const origins='Mar del Plata';                        // Poner que sea car.sucursal cuando tengamos definido como van a ser las sucursales
    this.distanceCalculator.getDistance(origins,destination).subscribe(response =>{
      const dist= response.rows[0].elements[0].distance.text;
      this.distance= `La distancia total es  ${dist}`;
      this.carryPrice= parseFloat(dist)*30;
      this.messagePrice=`El precio del acarreo es de ${this.carryPrice}`   // Mejorar esto, para que el monto se pueda actualizar desde admin
    });
  }
  
}
