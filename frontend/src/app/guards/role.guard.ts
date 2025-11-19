import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    
    // Vérifier si l'utilisateur est authentifié
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    // Récupérer les rôles requis depuis la configuration de la route
    const requiredRoles = route.data['roles'] as string[];
    
    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // Pas de rôles requis, accès autorisé
    }

    // Vérifier si l'utilisateur a au moins un des rôles requis
    const userRoles = this.authService.getCurrentRoles();
    const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));
    
    if (!hasRequiredRole) {
      // Rediriger vers la page d'accueil si pas d'autorisation
      this.router.navigate(['/']);
      return false;
    }
    
    return true;
  }
}
