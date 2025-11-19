import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavigationService } from '../../../../services/navigation.service';

@Component({
  selector: 'app-admin-layout',
  standalone: false,
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  
  sidebarOpen = false;
  private navigationSubscription!: Subscription;

  adminMenuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/products', label: 'Produits', icon: '📦' },
    { path: '/admin/users', label: 'Utilisateurs', icon: '👥' },
    { path: '/admin/promotions', label: 'Promotions', icon: '🎯' }
  ];

  constructor(private navigationService: NavigationService) {}

  ngOnInit() {
    console.log('AdminLayout initialized, sidebarOpen:', this.sidebarOpen);
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
