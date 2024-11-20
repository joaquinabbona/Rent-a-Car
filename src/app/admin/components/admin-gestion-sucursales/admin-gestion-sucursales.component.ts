import { Component, OnInit } from '@angular/core';
import { BranchService } from '../../../cars/services/branch.service';
import { Branch } from '../../../cars/models/branch';

@Component({
  selector: 'app-admin-gestion-sucursales',
  templateUrl: './admin-gestion-sucursales.component.html',
  styleUrl: './admin-gestion-sucursales.component.css'
})
export class AdminGestionSucursalesComponent implements OnInit{

  branches: Branch[] = []; // Lista de sucursales
  newBranch: Branch = { id: '', city: '' }; // Objeto Branch inicializado para el formulario
  errorMessage: string = ''; // Para manejar errores

  constructor(private branchService: BranchService) {}

  ngOnInit(): void {
    this.loadBranches(); // Cargar sucursales al inicializar el componente
  }

  // Cargar todas las sucursales
  loadBranches(): void {
    this.branchService.getBranches().subscribe({
      next: (data) => this.branches = data,
      error: () => this.errorMessage = 'Error al cargar las sucursales.'
    });
  }

  // Agregar una nueva sucursal
  addBranch(): void {
    if (this.newBranch.city) {
      this.newBranch.id = this.generateUniqueId(); // Genera un ID único
      this.branchService.addBranch(this.newBranch).subscribe({
        next: (branch) => {
          this.branches.push(branch);
          this.newBranch = { id: '', city: '' };
        },
        error: () => this.errorMessage = 'Error al agregar la sucursal.'
      });
    } else {
      this.errorMessage = 'La ciudad es obligatoria.';
    }
  }
  generateUniqueId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  // Eliminar una sucursal
  deleteBranch(id: string): void {
    this.branchService.deleteBranch(id).subscribe({
      next: () => {
        this.branches = this.branches.filter(branch => branch.id !== id); // Eliminar sucursal localmente
      },
      error: () => this.errorMessage = 'Error al eliminar la sucursal.'
    });
  }
}

