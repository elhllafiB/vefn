import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  
  stats = [
    { title: 'Total Produits', value: '156', icon: 'inventory', color: 'blue' },
    { title: 'Utilisateurs Actifs', value: '1,234', icon: 'people', color: 'green' },
    { title: 'Commandes du Mois', value: '89', icon: 'shopping_cart', color: 'orange' },
    { title: 'Revenus du Mois', value: '€12,450', icon: 'euro', color: 'purple' }
  ];

  recentActivities = [
    { action: 'Nouveau produit ajouté', user: 'Admin', time: 'Il y a 2 heures' },
    { action: 'Utilisateur inscrit', user: 'Marie Dupont', time: 'Il y a 3 heures' },
    { action: 'Commande traitée', user: 'Commande #1234', time: 'Il y a 4 heures' },
    { action: 'Promotion créée', user: 'Admin', time: 'Il y a 5 heures' }
  ];

  constructor() { }
}
