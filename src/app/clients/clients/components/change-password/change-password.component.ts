import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { AuthService } from '../../../../auth/auth.service';
import { Client } from '../../../interfaces/client.interface';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  passwordForm: FormGroup;
  clientId!: number;
  isLoading = true;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordsMatchValidator
    });
  }

  ngOnInit(): void {
    const user = this.auth.getCurrentUser();
    if (!user) {
      alert('Usuario no autenticado');
      this.router.navigate(['/login']);
      return;
    }

    //this.clientId = user.id;
    //this.isLoading = false;


    const routeId = this.route.snapshot.paramMap.get('id');
    this.clientId = routeId ? Number(routeId) : user.id;

    this.isLoading = false;

  }



                





  passwordsMatchValidator(form: FormGroup) {
    return form.get('newPassword')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.passwordForm.valid) {
      const { currentPassword, newPassword } = this.passwordForm.value;

      this.clientService.getClient(this.clientId).subscribe({
        next: (client) => {
          if (client.password !== currentPassword) {
            alert('La contraseña actual no es correcta');
            return;
          }

          const updatedClient: Client = {
  id: client.id,
  firstName: client.firstName,
  lastName: client.lastName,
  email: client.email,
  phone: client.phone,
  address: client.address,
  dateOfBirth: client.dateOfBirth,
  isActive: client.isActive,
  password: newPassword
};

          this.clientService.updateClient(this.clientId, updatedClient).subscribe({
            next: () => {
              alert('Contraseña actualizada exitosamente');
              const role = this.auth.getCurrentUser()?.role;
              if (role === 'admin') {
               this.router.navigate(['/admin-firstpage']);
               } else {
              this.router.navigate(['/firstpage']);
    }
            },
            error: (err) => {
              console.error('Error actualizando contraseña:', err);
              alert('Error al actualizar la contraseña');
            }
          });
        },
        error: (err) => {
          console.error('Error obteniendo cliente:', err);
          alert('No se pudo obtener el cliente');
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/firstpage']);
  }
}
