import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const userRole = this.authService.getUserRole();
    if (this.authService.isUserAuthenticated()) {
      // Si el usuario está autenticado, solo dejamos pasar si tiene el rol adecuado
      if (next.data.roles && next.data.roles.indexOf(userRole) === -1) {
        // Si el usuario no tiene el rol adecuado, redirigir a su página de inicio
        this.router.navigate([`/${userRole}-dashboard`]);
        return false;
      }
      return true;
    } else {
      // Si no está autenticado, redirigir al login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
