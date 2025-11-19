import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-test',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './auth-test.component.html',
  styleUrls: ['./auth-test.component.scss']
})
export class AuthTestComponent {
  
  private authService = inject(AuthService);

  loginAsAdmin() {
    this.authService.loginAsAdmin();
  }

  loginAsUser() {
    this.authService.loginAsUser();
  }

  logout() {
    this.authService.logout();
  }

  getCurrentUser() {
    return this.authService.getCurrentUser();
  }

  getCurrentRoles() {
    return this.authService.getCurrentRoles();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
