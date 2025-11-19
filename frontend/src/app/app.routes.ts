import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { ProductsComponent } from './modules/products/products.component';
import { ProductDetailComponent } from './modules/product-detail/product-detail.component';
import { LoginComponent } from './modules/auth/login.component';
import { RegisterComponent } from './modules/auth/register.component';
import { RoleGuard } from './guards/role.guard';
import { AuthTestComponent } from './components/auth-test/auth-test.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'auth-test', component: AuthTestComponent },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [RoleGuard],
    data: { roles: ['ROLE_ADMIN'] }
  },
  {
    path: 'user',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
    canActivate: [RoleGuard],
    data: { roles: ['ROLE_USER'] }
  },
  { path: '**', redirectTo: '' }
];
