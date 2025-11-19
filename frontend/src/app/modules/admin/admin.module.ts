import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Import des composants existants
import { AppHeaderComponent } from '../../components/app-header.component';
import { AppFooterComponent } from '../../components/app-footer.component';

// Composants Admin
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminPromotionsComponent } from './components/admin-promotions/admin-promotions.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'products', component: AdminProductsComponent },
      { path: 'users', component: AdminUsersComponent },
      { path: 'promotions', component: AdminPromotionsComponent }
    ]
  }
];

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminProductsComponent,
    AdminUsersComponent,
    AdminPromotionsComponent,
    AdminLayoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(adminRoutes),
    AppHeaderComponent,
    AppFooterComponent
  ]
})
export class AdminModule { }
