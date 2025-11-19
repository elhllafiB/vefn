import { Component } from '@angular/core';

@Component({
  selector: 'app-user-orders',
  standalone: false,
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent {
  
  orders = [
    { id: '#1234', date: '2024-01-15', total: 89.99, status: 'Livré', items: 3 },
    { id: '#1235', date: '2024-01-10', total: 45.50, status: 'En cours', items: 2 },
    { id: '#1236', date: '2024-01-05', total: 120.00, status: 'Livré', items: 4 }
  ];

  constructor() { }

  viewOrder(order: any) {
    console.log('Voir la commande:', order);
  }
}
