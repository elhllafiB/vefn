import { Component } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  standalone: false,
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent {
  
  userStats = [
    { title: 'Commandes', value: '5', icon: 'receipt', color: 'blue' },
    { title: 'Produits Favoris', value: '12', icon: 'favorite', color: 'red' },
    { title: 'Points Fidélité', value: '1,250', icon: 'stars', color: 'gold' },
    { title: 'Dernière Commande', value: 'Hier', icon: 'schedule', color: 'green' }
  ];

  recentOrders = [
    { id: '#1234', date: '2024-01-15', total: '€89.99', status: 'Livré' },
    { id: '#1235', date: '2024-01-10', total: '€45.50', status: 'En cours' },
    { id: '#1236', date: '2024-01-05', total: '€120.00', status: 'Livré' }
  ];

  constructor() { }
}
