import { Component, OnInit } from '@angular/core';
import { Car } from '../models/car';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css'
})
export class CarDetailsComponent implements OnInit {
  car: Car | null = null; // Inicializa como null para manejar el caso donde no hay coche.

  private cars: Car[] = [ // Simulación de un arreglo de coches (debes moverlo a un servicio real)
    {
      id: 1,
      brand: 'Toyota',
      model: 'Corolla',
      price: 20000,
      year: 2020,
      description: 'Auto en excelente estado.',
      isForSale: false,
      available: true,
      imageUrl: 'https://img.freepik.com/foto-gratis/vista-coche-3d_23-2150796894.jpg?t=st=1730389838~exp=1730393438~hmac=95aeba6aa2cbc9898bef53894fbc4480efeffe4228b1a8377a974a54e3d7f015&w=740'
    },
    {
      id: 2,
      brand: 'Ford',
      model: 'Focus',
      price: 18000,
      year: 2019,
      description: 'Auto económico y práctico.',
      isForSale: false,
      available: true,
      imageUrl: 'https://img.freepik.com/foto-gratis/vista-coche-3d_23-2150796904.jpg?t=st=1730394780~exp=1730398380~hmac=37bc0f14b64e65e65a1a93e853fdcdfc5407226d96a8984404674db7c7413b6a&w=740'
    }
  ];

  rentalStartDate: string | null = null;
  rentalEndDate: string | null = null

  constructor(private route: ActivatedRoute) {}

   ngOnInit(): void {
    const carId = this.route.snapshot.paramMap.get('id'); // Obtén el id de la ruta
    if (carId) {
      this.car = this.cars.find(car => car.id.toString() === carId) || null
    }
  }
}
