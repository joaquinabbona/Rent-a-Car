import { Component, OnInit } from '@angular/core';
import { ServiceAdminService } from '../../services/service-admin.service';
import { Admin } from '../../interfaces/admin';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {
  admins: Admin[] = [];
  error: string = '';

  constructor(private adminService: ServiceAdminService) {}

  ngOnInit(): void {
    this.getAdmins();
  }

  getAdmins(): void {
    this.adminService.getAdmins().subscribe({
      next: (data) => {
        this.admins = data;
      },
      error: (error) => {
        console.error('Error al obtener la lista de administradores:', error);
        this.error = 'No se pudo obtener la lista de administradores';
      }
    });
  }

  deleteAdmin(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este administrador?')) {
      this.adminService.deleteAdmin(id).subscribe({
        next: () => {
          this.admins = this.admins.filter(admin => admin.id !== id);
          alert('Administrador eliminado correctamente');
        },
        error: (error) => {
          console.error('Error al eliminar el administrador:', error);
          alert('No se pudo eliminar el administrador');
        }
      });
    }
  }
}

