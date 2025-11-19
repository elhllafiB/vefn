import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  
  user = {
    name: 'Marie Dupont',
    email: 'marie@example.com',
    phone: '+33 6 12 34 56 78',
    address: '123 Rue de la Paix, 75001 Paris'
  };

  constructor() { }

  saveProfile() {
    console.log('Profil sauvegardé:', this.user);
    // TODO: Implémenter la sauvegarde
  }

  cancelEdit() {
    console.log('Édition annulée');
    // TODO: Restaurer les valeurs précédentes
  }
}
