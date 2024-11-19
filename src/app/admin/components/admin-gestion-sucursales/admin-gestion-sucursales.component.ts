import { Component, OnInit } from '@angular/core';
import { BranchService } from '../../../cars/services/branch.service';
import { Branch } from '../../../cars/models/branch';

@Component({
  selector: 'app-admin-gestion-sucursales',
  templateUrl: './admin-gestion-sucursales.component.html',
  styleUrl: './admin-gestion-sucursales.component.css'
})
export class AdminGestionSucursalesComponent implements OnInit {
  branches: Branch[] = []; 
  newBranchCity: string = ''; 

  constructor(private branchService: BranchService) {}

  ngOnInit(): void {
    this.loadBranches();  
  }

  loadBranches(): void {
    this.branchService.getBranches().subscribe(
      (branches) => {
        this.branches = branches;
      },
      (error) => {
        console.error('Error al cargar las sucursales', error);
      }
    );
  }

  addBranch(): void {
    if (this.newBranchCity.trim()) {
      const newBranch: Branch = {
        id: 0,
        city: this.newBranchCity
      };

      this.branchService.addBranch(newBranch).subscribe(
        (branch: Branch) => {
          this.branches.push(branch);
          this.newBranchCity = '';  
        },
        (error) => {
          console.error('Error al agregar la sucursal', error);
        }
      );
    }
  }

  deleteBranch(id: number): void {
    console.log('ID de la sucursal a eliminar:', id); 
    this.branchService.deleteBranch(id).subscribe(
      () => {
       
        this.branches = this.branches.filter(branch => branch.id !== id);
        console.log('Sucursal eliminada con éxito');
      },
      (error) => {
        console.error('Error al eliminar la sucursal', error);
      }
    );
  }
}
