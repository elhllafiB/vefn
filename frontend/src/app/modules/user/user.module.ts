import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Import des composants existants
import { AppHeaderComponent } from '../../components/app-header.component';
import { AppFooterComponent } from '../../components/app-footer.component';

// Composants User
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserProductsComponent } from './components/user-products/user-products.component';
import { UserCartComponent } from './components/user-cart/user-cart.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserLayoutComponent } from './components/user-layout/user-layout.component';

const userRoutes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: UserDashboardComponent },
      { path: 'products', component: UserProductsComponent },
      { path: 'cart', component: UserCartComponent },
      { path: 'orders', component: UserOrdersComponent },
      { path: 'profile', component: UserProfileComponent }
    ]
  }
];

@NgModule({
  declarations: [
    UserDashboardComponent,
    UserProductsComponent,
    UserCartComponent,
    UserOrdersComponent,
    UserProfileComponent,
    UserLayoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(userRoutes),
    AppHeaderComponent,
    AppFooterComponent
  ]
})
export class UserModule { }
