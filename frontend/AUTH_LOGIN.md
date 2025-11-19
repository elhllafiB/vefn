# 🔐 Système d'Authentification HumbleHome

## 📧 **Configuration de l'Admin**

### Emails administrateurs :
- **`admin@humblehome.com`** → Redirige vers `/admin`
- **`admin@example.com`** → Redirige vers `/admin`

### Tous les autres emails :
- Sont considérés comme **utilisateurs standards**
- Redirigent vers `/user`

## 🎯 **Fonctionnement**

### 1. Connexion Admin
```
Email: admin@humblehome.com
Password: [n'importe quel mot de passe]
→ Redirige vers /admin
```

### 2. Connexion Utilisateur
```
Email: utilisateur@example.com
Password: [n'importe quel mot de passe]
→ Redirige vers /user
```

## 🚀 **Test Rapide**

1. **Allez sur** : `http://localhost:4200/login`
2. **Connectez-vous avec** `admin@humblehome.com` → Accès admin
3. **Connectez-vous avec n'importe quel autre email** → Accès utilisateur

## 🔐 **Sécurité**

- Les emails admin sont définis en dur dans `login.component.ts`
- Les mots de passe ne sont pas vérifiés (simulation)
- Dans la production, intégrer avec Keycloak ou une authentification réelle

## 📝 **Modification des Emails Admin**

Pour changer les emails administrateurs, modifiez le fichier :
```
frontend/src/app/modules/auth/login.component.ts
```

Section :
```typescript
private isAdminEmail(email: string): boolean {
  const adminEmails = [
    'admin@humblehome.com',
    'admin@example.com',
    'administrator@humblehome.com'
  ];
  return adminEmails.includes(email.toLowerCase().trim());
}
```
