# Boutique App - Angular E-commerce Application

Une application e-commerce moderne développée avec Angular 19, incluant un système de thème sombre/clair, l'internationalisation et une interface utilisateur responsive.

## 🚀 Fonctionnalités

- **Interface moderne** avec design responsive
- **Thème sombre/clair** avec persistance dans localStorage
- **Internationalisation** (Espagnol, Anglais, Français) avec ngx-translate
- **Bannière défilante** avec animations CSS
- **Sections produits** avec catégories dynamiques
- **Pages d'authentification** (Login/Register)
- **Navigation fluide** avec Angular Router
- **Animations** et transitions CSS

## 🛠️ Technologies utilisées

- **Angular 19** - Framework principal
- **TypeScript** - Langage de programmation
- **SCSS** - Préprocesseur CSS
- **ngx-translate** - Internationalisation
- **Angular Router** - Navigation
- **Angular Forms** - Gestion des formulaires

## 📦 Installation

1. **Cloner le projet**
   ```bash
   git clone <repository-url>
   cd boutique-app/frontend
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement**
   ```bash
   npm start
   # ou
   ng serve
   ```

4. **Ouvrir dans le navigateur**
   ```
   http://localhost:4200
   ```

## 🎨 Structure du projet

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/          # Composants partagés
│   │   │   ├── app-header.component.*
│   │   │   └── app-footer.component.*
│   │   ├── modules/             # Modules fonctionnels
│   │   │   ├── home/            # Page d'accueil
│   │   │   └── auth/            # Authentification
│   │   ├── services/            # Services Angular
│   │   │   └── product.service.ts
│   │   ├── app.component.*      # Composant racine
│   │   ├── app.routes.ts        # Configuration routing
│   │   └── app.config.ts        # Configuration app
│   ├── assets/
│   │   └── i18n/               # Fichiers de traduction
│   │       ├── es.json
│   │       ├── en.json
│   │       └── fr.json
│   └── styles.css              # Styles globaux
```

## 🌐 Internationalisation

L'application supporte 3 langues :
- **Espagnol (es)** - Langue par défaut
- **Anglais (en)**
- **Français (fr)**

Les traductions sont stockées dans `src/assets/i18n/` et peuvent être facilement modifiées.

## 🎭 Thème sombre/clair

- Toggle disponible dans le header
- Persistance du choix dans localStorage
- Transitions fluides entre les thèmes
- Variables CSS pour une maintenance facile

## 📱 Responsive Design

L'application est entièrement responsive avec des breakpoints pour :
- **Desktop** (> 768px)
- **Tablette** (768px - 480px)
- **Mobile** (< 480px)

## 🚀 Scripts disponibles

```bash
# Serveur de développement
npm start

# Build de production
npm run build

# Tests unitaires
npm test

# Build en mode watch
npm run watch
```

## 🎯 Pages disponibles

- **/** - Page d'accueil avec Hero section et produits
- **/login** - Page de connexion
- **/register** - Page d'inscription

## 🎨 Couleurs principales

- **Couleur primaire** : `#f34f56` (Rouge corail)
- **Couleur secondaire** : `#ffffff` (Blanc)
- **Fond sombre** : `#1a1a1a`
- **Texte sombre** : `#ffffff`
- **Texte clair** : `#333333`

## 🔧 Personnalisation

### Ajouter une nouvelle langue

1. Créer un nouveau fichier dans `src/assets/i18n/` (ex: `de.json`)
2. Ajouter l'option dans le sélecteur de langue du header
3. Configurer la langue dans `app.config.ts`

### Modifier les couleurs

Les couleurs sont définies dans `src/styles.css` avec des variables CSS :
```css
:root {
  --primary-color: #f34f56;
  --secondary-color: #ffffff;
  /* ... */
}
```

### Ajouter de nouveaux produits

Modifier le service `ProductService` dans `src/app/services/product.service.ts` :
```typescript
private mockProducts: Product[] = [
  // Ajouter vos produits ici
];
```

## 📄 Licence

Ce projet est sous licence MIT.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche feature
3. Commit vos changements
4. Push vers la branche
5. Ouvrir une Pull Request

## 📞 Support

Pour toute question ou problème, n'hésitez pas à ouvrir une issue sur GitHub.

---

**Développé avec ❤️ en Angular 19**