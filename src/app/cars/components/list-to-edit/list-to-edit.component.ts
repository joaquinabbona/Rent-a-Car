import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car';

@Component({
  selector: 'app-list-to-edit',
  templateUrl: './list-to-edit.component.html',
  styleUrls: ['./list-to-edit.component.css']
})
export class ListToEditComponent implements OnInit {
  cars: Car[] = [];
  filteredCars: Car[] = [];
  
  filters = {
    brand: '',
    year: null,
    type: '',
    minPrice: null, // Valor inicial de precio mínimo
    maxPrice: null  // Valor inicial de precio máximo
  };

  uniqueBrands: string[] = [];
  uniqueYears: number[] = [];
  uniqueTypes: string[] = [];

  constructor(private carService: CarService) {}

  ngOnInit() {
    this.getCars();
  }

  getCars() {
    this.carService.getCars().subscribe((data: Car[]) => {
      this.cars = data;
      this.filteredCars = data; // Inicialmente muestra todos los autos
      this.setFilterOptions();
    });
  }

  setFilterOptions() {
    // Extraer opciones únicas para cada filtro
    this.uniqueBrands = [...new Set(this.cars.map(car => car.brand))];
    this.uniqueYears = [...new Set(this.cars.map(car => car.year))];
    this.uniqueTypes = [...new Set(this.cars.map(car => car.type))];
  }

  adjustPrices(type: 'min' | 'max') {
    let minPrice = this.filters.minPrice ?? 0; // Usar 0 temporalmente para la comparación si es null
    let maxPrice = this.filters.maxPrice ?? 0; // Usar 0 temporalmente para la comparación si es null
  
    // Asegura que maxPrice sea igual o mayor a minPrice
    if (type === 'min' && this.filters.minPrice !== null && this.filters.maxPrice !== null && this.filters.minPrice > this.filters.maxPrice) {
      this.filters.maxPrice = this.filters.minPrice;
    }
  
    if (type === 'max' && this.filters.minPrice !== null && this.filters.maxPrice !== null && this.filters.maxPrice < this.filters.minPrice) {
      this.filters.minPrice = this.filters.maxPrice;
    }
  }

  applyFilters() {
    this.filteredCars = this.cars.filter(car =>
      (!this.filters.brand || car.brand === this.filters.brand) &&
      (!this.filters.year || this.filters.year === 'Todos' || car.year === +this.filters.year) &&
      (!this.filters.type || this.filters.type === 'Todos' || car.type === this.filters.type) &&
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
