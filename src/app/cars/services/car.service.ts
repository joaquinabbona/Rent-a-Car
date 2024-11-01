import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl = 'http://localhost:3000/cars'; 
  
  cars: Car[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl);
  }

  loadVehicles(): void{
    this.loading = true;
    this.getCars().subscribe({
      next: (data) => {
        this.cars = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar los vehículos';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  createCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.apiUrl, car);
  }
  
  addNewVehicle(car: Car): void {
    this.loading = true;
    this.createCar(car).subscribe({
      next: (newCar) => {
        this.cars.push(newCar);
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al crear el vehículo';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

}