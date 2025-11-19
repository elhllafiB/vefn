import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavigationService } from '../../../../services/navigation.service';

@Component({
  selector: 'app-user-layout',
  standalone: false,
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent implements OnInit, OnDestroy {
  
  sidebarOpen = false;
  private navigationSubscription!: Subscription;

  userMenuItems = [
    { path: '/user/dashboard', label: 'Dashboard', icon: '🏠' },
    { path: '/user/profile', label: 'Profil', icon: '👤' },
    { path: '/user/products', label: 'Produits', icon: '🛍️' },
    { path: '/user/cart', label: 'Panier', icon: '🛒' },
    { path: '/user/orders', label: 'Commandes', icon: '📦' },
    { path: '', label: 'Déconnexion', icon: '🚪', action: 'logout' }
  ];

  constructor(private navigationService: NavigationService) {}

  ngOnInit() {
    // Écouter les changements de state de la sidebar
    console.log('UserLayout initialized, sidebarOpen:', this.sidebarOpen);
    this.navigationSubscription = this.navigationService.sidebarOpen$.subscribe(
      (open: boolean) => {
        console.log('Sidebar state changed to:', open);
        this.sidebarOpen = open;
      }
    );
  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }

  toggleSidebar() {
    this.navigationService.toggleSidebar();
  }

  closeSidebar() {
    this.navigationService.closeSidebar();
  }

  closeSidebarOnClick() {
    // Fermer la sidebar après avoir cliqué sur un lien
    this.navigationService.closeSidebar();
  }
}
