# 🎯 Système de Rôles HumbleHome

## 📋 Vue d'ensemble

Ce projet Angular intègre un système de rôles complet avec deux niveaux d'accès :
- **ROLE_USER** : Espace utilisateur avec catalogue, panier, commandes et profil
- **ROLE_ADMIN** : Espace administrateur avec dashboard, gestion des produits, utilisateurs et promotions

## 🏗️ Architecture

### Structure des modules

```
src/app/
├── guards/
│   └── role.guard.ts          # Guard pour protéger les routes par rôle
├── services/
│   └── auth.service.ts        # Service d'authentification et gestion des rôles
├── modules/
│   ├── admin/                 # Module administrateur
│   │   ├── admin.module.ts
│   │   └── components/
│   │       ├── admin-layout/
│   │       ├── admin-dashboard/
│   │       ├── admin-products/
│   │       ├── admin-users/
│   │       └── admin-promotions/
│   └── user/                  # Module utilisateur
│       ├── user.module.ts
│       └── components/
│           ├── user-layout/
│           ├── user-dashboard/
│           ├── user-products/
│           ├── user-cart/
│           ├── user-orders/
│           └── user-profile/
└── components/
    └── auth-test/             # Composant de test pour l'authentification
```

## 🚀 Utilisation

### 1. Test du système

Accédez à `/auth-test` pour tester les différentes connexions :

```typescript
// Se connecter en tant qu'admin
this.authService.loginAsAdmin();

// Se connecter en tant qu'utilisateur
this.authService.loginAsUser();

// Se déconnecter
this.authService.logout();
```

### 2. Navigation

- **Espace Admin** : `/admin` (nécessite ROLE_ADMIN)
- **Espace Utilisateur** : `/user` (nécessite ROLE_USER)

### 3. Protection des routes

```typescript
{
  path: 'admin',
  loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
  canActivate: [RoleGuard],
  data: { roles: ['ROLE_ADMIN'] }
}
```

## 🔧 Configuration

### Service d'authentification

Le `AuthService` gère :
- L'état de connexion de l'utilisateur
- Les rôles de l'utilisateur
- La persistance en localStorage
- Les méthodes de connexion/déconnexion

### RoleGuard

Le `RoleGuard` :
- Vérifie l'authentification
- Contrôle les rôles requis
- Redirige si non autorisé

## 🎨 Interface utilisateur

### Layout Admin
- Sidebar avec navigation
- Dashboard avec statistiques
- Gestion des produits, utilisateurs, promotions
- Design sombre et professionnel

### Layout User
- Sidebar avec navigation
- Dashboard personnel
- Catalogue produits, panier, commandes, profil
- Design clair et convivial

## 🔄 Intégration Keycloak

Pour intégrer avec Keycloak, remplacez les méthodes simulées dans `AuthService` :

```typescript
// Remplacer login() par l'intégration Keycloak
async login(username: string, password: string): Promise<boolean> {
  try {
    await this.keycloakService.login({
      username: username,
      password: password
    });
    
    const user = this.keycloakService.getKeycloakInstance().tokenParsed;
    const roles = this.keycloakService.getUserRoles();
    
    this.setCurrentUser(user, roles);
    return true;
  } catch (error) {
    return false;
  }
}
```

## 📱 Responsive Design

Tous les composants sont responsives et s'adaptent aux différentes tailles d'écran.

## 🧪 Tests

Utilisez le composant `AuthTestComponent` pour tester :
- Les connexions avec différents rôles
- La navigation entre les espaces
- La protection des routes
- La déconnexion

## 🚀 Prochaines étapes

1. Intégrer Keycloak pour l'authentification réelle
2. Ajouter des tests unitaires
3. Implémenter la gestion des erreurs
4. Ajouter des animations de transition
5. Optimiser les performances avec le lazy loading
