import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  onSubmit() {
    if (this.registerForm.password !== this.registerForm.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (this.registerForm.name && this.registerForm.email && this.registerForm.password) {
      console.log('Register attempt:', this.registerForm);
      // Ici vous ajouteriez la logique d'inscription
    }
  }
}
