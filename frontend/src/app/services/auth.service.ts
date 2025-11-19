import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private currentUserSubject = new BehaviorSubject<any>(null);
  private currentRolesSubject = new BehaviorSubject<string[]>([]);
  
  public currentUser$ = this.currentUserSubject.asObservable();
  public currentRoles$ = this.currentRolesSubject.asObservable();

  constructor() {
    // Charger les données utilisateur depuis localStorage au démarrage
    this.loadUserFromStorage();
  }

  // Simuler la connexion avec Keycloak
  login(username: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      // Simulation - à remplacer par l'intégration Keycloak réelle
      setTimeout(() => {
        const user = {
          id: 1,
          username: username,
          email: `${username}@example.com`,
          name: username === 'admin' ? 'Admin User' : 'Marie Dupont'
        };
        
        const roles = username === 'admin' ? ['ROLE_ADMIN', 'ROLE_USER'] : ['ROLE_USER'];
        
        this.setCurrentUser(user, roles);
        resolve(true);
      }, 1000);
    });
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.currentRolesSubject.next([]);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRoles');
  }

  setCurrentUser(user: any, roles: string[]): void {
    this.currentUserSubject.next(user);
    this.currentRolesSubject.next(roles);
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('userRoles', JSON.stringify(roles));
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  getCurrentRoles(): string[] {
    return this.currentRolesSubject.value;
  }

  hasRole(role: string): boolean {
    return this.getCurrentRoles().includes(role);
  }

  isAdmin(): boolean {
    return this.hasRole('ROLE_ADMIN');
  }

  isUser(): boolean {
    return this.hasRole('ROLE_USER');
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  private loadUserFromStorage(): void {
    const user = localStorage.getItem('currentUser');
    const roles = localStorage.getItem('userRoles');
    
    if (user && roles) {
      try {
        this.currentUserSubject.next(JSON.parse(user));
        this.currentRolesSubject.next(JSON.parse(roles));
      } catch (error) {
        console.error('Erreur lors du chargement des données utilisateur:', error);
        this.logout();
      }
    }
  }

  // Méthodes pour simuler différents scénarios de test
  loginAsAdmin(): void {
    this.login('admin', 'password').then(() => {
      console.log('Connecté en tant qu\'admin');
    });
  }

  loginAsUser(): void {
    this.login('user', 'password').then(() => {
      console.log('Connecté en tant qu\'utilisateur');
    });
  }
}
