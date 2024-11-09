import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceAdminService } from '../../services/service-admin.service';
import { Admin } from '../../interfaces/admin';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.css']
})
export class AdminAddComponent {
  adminForm: FormGroup;
  error: string = '';
  success: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private adminService: ServiceAdminService,
    private router: Router
  ) {
    this.adminForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.adminForm.valid) {
      const { username, password, email, fullName } = this.adminForm.value;

      const newAdmin: Admin = { id: 0, username, password, email, fullName }; 
      this.adminService.addAdmin(newAdmin).subscribe({
        next: () => {
          this.success = 'Administrador agregado exitosamente';
          this.error = '';
          this.router.navigate(['/admin/dashboard']);
        },
        error: (error) => {
          console.error('Error al agregar administrador:', error);
          this.error = 'Error al agregar el administrador';
          this.success = '';
        }
      });
    } else {
      this.error = 'Por favor, completa todos los campos correctamente.';
    }
  }
}
