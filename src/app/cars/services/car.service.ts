import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../car';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'http://localhost:3000/cars'; 
  cars: Car[] = [];
  loading: boolean = true;
  error: string | null = null;
  router: any;

  constructor(private http: HttpClient, private ActivatedRoute: ActivatedRoute) {}

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

  addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.apiUrl, car);
  }

  updateCar(car: Car): Observable<Car> {
    const url = `${this.apiUrl}/${car.id}`;
    return this.http.put<Car>(url, car);
  }

  getCarById(id: number): Observable<Car> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Car>(url);
  }
  
}