import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiredRoles = route.data['roles'];
    const currentUser = this.authService.getCurrentUser();

    if (currentUser) {
      const currentUserRole = currentUser.role;

      // Verificar si el usuario tiene el rol necesario
      if (requiredRoles.includes(currentUserRole)) {
        return true;
      } else {
        // Redirigir según el rol si el acceso no está permitido
        this.redirectUserBasedOnRole(currentUserRole);
        return false;
      }
    } else {
      // Redirigir a login si no está autenticado
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }

  private redirectUserBasedOnRole(role: string): void {
    if (role === 'admin') {
      this.router.navigate(['/admin/firstpage']);
    } else if (role === 'client') {
      this.router.navigate(['/home']);
    }
  }
}
