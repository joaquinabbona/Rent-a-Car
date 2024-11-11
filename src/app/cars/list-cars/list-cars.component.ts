import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';
import { Car } from '../car';

@Component({
  selector: 'app-list-vehicles',
  templateUrl: './list-cars.component.html',
  styleUrls: ['./list-cars.component.css']
})
export class ListCarsComponent implements OnInit {
  cars: Car[] = [];
  filteredCars: Car[] = [];
  
  filters = {
    brand: '',
    year: null,
    type: '',
    minPrice: null,       // Valor inicial de precio mínimo
    maxPrice: null   // Valor inicial de precio máximo
};

  uniqueBrands: string[] = [];
  uniqueYears: number[] = [];
  uniqueTypes: string[] = [];
  
  constructor(public carService: CarService) {}

  ngOnInit() {
    this.getCars();
  }

  getCars() {
    this.carService.getCars().subscribe((data: Car[]) => {
      this.cars = data;
      this.filteredCars = data; // Inicialmente muestra todos los carros
      this.setFilterOptions();
    });
  }

  setFilterOptions() {
    // Extraer opciones únicas para cada filtro
    this.uniqueBrands = [...new Set(this.cars.map(car => car.brand))];
    this.uniqueYears = [...new Set(this.cars.map(car => car.year))];
    this.uniqueTypes = [...new Set(this.cars.map(car => car.type))];
  }

  applyFilters() {
    this.filteredCars = this.cars.filter(car =>
      (!this.filters.brand || car.brand === this.filters.brand) &&
      (this.filters.year === null || car.year === +this.filters.year) &&  // Asegúrate de que filters.year sea número
      (!this.filters.type || car.type === this.filters.type) &&
      (this.filters.minPrice === null || car.price >= this.filters.minPrice) &&
      (this.filters.maxPrice === null || car.price <= this.filters.maxPrice)
    );
  }
  
  
  clearFilters() {
    this.filters = {
      brand: '',
      year: null,
      type: '',
      minPrice: null,
      maxPrice: null
    };
    this.filteredCars = this.cars;
  }
  
}
