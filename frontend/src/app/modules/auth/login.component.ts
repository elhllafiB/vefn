import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = {
    email: '',
    password: ''
  };

  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.errorMessage = '';
    
    if (!this.loginForm.email || !this.loginForm.password) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }

    this.isLoading = true;

    // Simuler un délai d'authentification
    setTimeout(() => {
      this.performLogin();
    }, 1000);
  }

  private performLogin() {
    const email = this.loginForm.email.toLowerCase().trim();
    
    // Vérifier si c'est l'admin (email spécifique)
    if (email === 'admin@humblehome.com' || email === 'admin@example.com') {
      // Connexion en tant qu'admin
      this.authService.loginAsAdmin();
      this.router.navigate(['/admin']);
    } else {
      // Connexion en tant qu'utilisateur normal
      this.authService.loginAsUser();
      this.router.navigate(['/user']);
    }

    this.isLoading = false;
  }

  // Helper pour déterminer si l'email est celui de l'admin
  private isAdminEmail(email: string): boolean {
    const adminEmails = [
      'admin@humblehome.com',
      'admin@example.com',
      'administrator@humblehome.com'
    ];
    return adminEmails.includes(email.toLowerCase().trim());
  }
}
