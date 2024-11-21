import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) {}

  navigateToHome() {
    const userRole = this.authService.getCurrentUserRole();

    if (userRole === 'admin') {
      this.router.navigate(['/admin-firstpage']);
    } else if (userRole === 'client') {
      this.router.navigate(['/firstpage']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}