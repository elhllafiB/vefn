# Comment voir les images d'un produit dans Postman

Il y a **3 méthodes** pour voir les images d'un produit dans Postman :

---

## 📋 Méthode 1 : Récupérer le produit avec ses images (métadonnées)

Cette méthode vous donne les **informations sur les images** (nom, type, chemin, URL) mais pas l'image elle-même.

### Étape 1 : Récupérer le produit
```
GET http://localhost:8081/product/{id}
```

**Exemple :**
```
GET http://localhost:8081/product/1
```

**Réponse JSON :**
```json
{
  "id": 1,
  "name": "iPhone 15",
  "brand": "Apple",
  "price": 999.99,
  "inventory": 50,
  "description": "Dernier modèle",
  "category": "Smartphone",
  "images": [
    {
      "id": 1,
      "fileName": "iphone-front.jpg",
      "fileType": "image/jpeg",
      "filePath": "./uploads/images/550e8400-e29b-41d4-a716-446655440000.jpg",
      "downloadUrl": "/images/download/550e8400-e29b-41d4-a716-446655440000.jpg"
    },
    {
      "id": 2,
      "fileName": "iphone-back.jpg",
      "fileType": "image/jpeg",
      "filePath": "./uploads/images/660e8400-e29b-41d4-a716-446655440001.jpg",
      "downloadUrl": "/images/download/660e8400-e29b-41d4-a716-446655440001.jpg"
    }
  ]
}
```

**Note :** Vous voyez les métadonnées mais pas l'image visuelle.

---

## 🖼️ Méthode 2 : Récupérer les images d'un produit (métadonnées)

Cette méthode vous donne la **liste des images** d'un produit spécifique.

```
GET http://localhost:8081/images/product/{productId}
```

**Exemple :**
```
GET http://localhost:8081/images/product/1
```

**Réponse JSON :**
```json
[
  {
    "id": 1,
    "fileName": "iphone-front.jpg",
    "fileType": "image/jpeg",
    "filePath": "./uploads/images/550e8400-e29b-41d4-a716-446655440000.jpg",
    "downloadUrl": "/images/download/550e8400-e29b-41d4-a716-446655440000.jpg"
  },
  {
    "id": 2,
    "fileName": "iphone-back.jpg",
    "fileType": "image/jpeg",
    "filePath": "./uploads/images/660e8400-e29b-41d4-a716-446655440001.jpg",
    "downloadUrl": "/images/download/660e8400-e29b-41d4-a716-446655440001.jpg"
  }
]
```

---

## 🎨 Méthode 3 : VOIR L'IMAGE VISUELLEMENT dans Postman (RECOMMANDÉ)

Cette méthode vous permet de **voir l'image directement** dans Postman !

### Option A : Télécharger l'image par ID

```
GET http://localhost:8081/images/download/{imageId}
```

**Exemple :**
```
GET http://localhost:8081/images/download/1
```

**Dans Postman :**
1. Envoyez la requête
2. Cliquez sur l'onglet **"Preview"** ou **"Visualize"** pour voir l'image
3. Ou cliquez sur **"Send and Download"** pour télécharger l'image

### Option B : Télécharger l'image par nom de fichier

Si vous avez le `downloadUrl` du produit (ex: `/images/download/550e8400-e29b-41d4-a716-446655440000.jpg`), utilisez :

```
GET http://localhost:8081/images/download/file/{fileName}
```

**Exemple :**
```
GET http://localhost:8081/images/download/file/550e8400-e29b-41d4-a716-446655440000.jpg
```

**Note :** Utilisez seulement le nom du fichier (sans le préfixe `/images/download/`)

---

## 🔄 Workflow complet pour voir les images

### Étape 1 : Récupérer le produit
```
GET http://localhost:8081/product/1
```

**Copiez l'ID de l'image** (ex: `id: 1`) ou le **fileName** du `downloadUrl`

### Étape 2 : Voir l'image visuellement
```
GET http://localhost:8081/images/download/1
```

**Dans Postman :**
- Onglet **"Preview"** → Vous verrez l'image directement
- Onglet **"Body"** → Vous verrez les données binaires (raw)
- Cliquez sur **"Send and Download"** → Téléchargez l'image sur votre ordinateur

---

## 📸 Exemple pratique dans Postman

### 1. Créer un produit
```
POST http://localhost:8081/product
Body:
{
  "name": "MacBook Pro",
  "brand": "Apple",
  "price": 2499.99,
  "inventory": 20,
  "description": "MacBook Pro 16 pouces",
  "category": "Laptop"
}
```
**Notez l'ID retourné** (ex: `id: 1`)

### 2. Ajouter une image au produit
```
POST http://localhost:8081/images
Body (form-data):
  - productId: 1
  - file: [sélectionner une image]
```
**Notez l'ID de l'image retourné** (ex: `id: 1`)

### 3. Voir le produit avec ses images (métadonnées)
```
GET http://localhost:8081/product/1
```
**Vous verrez les informations des images dans la réponse JSON**

### 4. VOIR L'IMAGE VISUELLEMENT ✨
```
GET http://localhost:8081/images/download/1
```

**Dans Postman :**
- Après avoir envoyé la requête, allez dans l'onglet **"Preview"**
- L'image s'affichera directement dans Postman !
- Vous pouvez aussi cliquer sur **"Send and Download"** pour sauvegarder l'image

---

## 💡 Astuces Postman

### Pour voir l'image dans l'onglet Preview :
1. Envoyez la requête `GET /images/download/{id}`
2. Cliquez sur l'onglet **"Preview"** (en bas de la réponse)
3. L'image s'affichera automatiquement si c'est un format supporté (JPG, PNG, GIF, etc.)

### Pour télécharger l'image :
1. Cliquez sur le bouton **"Send and Download"** (à côté de "Send")
2. Choisissez où sauvegarder l'image
3. L'image sera téléchargée sur votre ordinateur

### Pour copier l'URL de l'image :
Dans la réponse du produit, vous avez le `downloadUrl`. Vous pouvez :
- L'utiliser directement dans un navigateur : `http://localhost:8081/images/download/1`
- Ou l'utiliser dans Postman avec l'endpoint complet

---

## 🎯 Résumé rapide

| Action | Endpoint | Résultat |
|--------|----------|----------|
| Voir les infos du produit + images | `GET /product/{id}` | JSON avec métadonnées |
| Voir les infos des images d'un produit | `GET /images/product/{productId}` | JSON avec métadonnées |
| **VOIR L'IMAGE** | `GET /images/download/{imageId}` | **Image visuelle** ✨ |
| Télécharger l'image | `GET /images/download/{imageId}` + "Send and Download" | Fichier image |

---

## ⚠️ Notes importantes

1. **Format des images :** JPG, PNG, GIF sont supportés et s'affichent dans l'onglet Preview
2. **Taille :** Les grandes images peuvent prendre du temps à charger
3. **URL complète :** Si vous utilisez le `downloadUrl` dans un navigateur, n'oubliez pas d'ajouter le préfixe : `http://localhost:8081`
4. **ID vs fileName :** Utilisez l'ID de l'image pour `/images/download/{id}` ou le fileName pour `/images/download/file/{fileName}`

