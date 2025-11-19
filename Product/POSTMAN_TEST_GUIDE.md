# Guide de Test Postman - Product Service

**URL de base :** `http://localhost:8081`

---

## 📦 ENDPOINTS PRODUIT

### 1. Créer un produit
**Méthode :** `POST`  
**URL :** `http://localhost:8081/product`  
**Headers :**
```
Content-Type: application/json
```

**Body (raw JSON) :**
```json
{
  "name": "iPhone 15",
  "brand": "Apple",
  "price": 999.99,
  "inventory": 50,
  "description": "Dernier modèle d'iPhone avec puce A17",
  "category": "Smartphone"
}
```

**⚠️ IMPORTANT :** Assurez-vous d'inclure le champ `"category"` dans votre JSON. Si vous l'oubliez, la catégorie sera `null` en base de données.

**Réponse attendue :** ProductDTO avec l'ID généré et la catégorie sauvegardée

---

### 2. Récupérer tous les produits
**Méthode :** `GET`  
**URL :** `http://localhost:8081/product`

**Réponse attendue :** Liste de ProductDTO

---

### 3. Récupérer un produit par ID
**Méthode :** `GET`  
**URL :** `http://localhost:8081/product/{id}`  
**Exemple :** `http://localhost:8081/product/1`

**Réponse attendue :** ProductDTO avec ses images

---

### 4. Modifier un produit
**Méthode :** `PUT`  
**URL :** `http://localhost:8081/product/{id}`  
**Exemple :** `http://localhost:8081/product/1`  
**Headers :**
```
Content-Type: application/json
```

**Body (raw JSON) :**
```json
{
  "name": "iPhone 15 Pro",
  "brand": "Apple",
  "price": 1199.99,
  "inventory": 30,
  "description": "Version Pro avec écran ProMotion",
  "category": "Smartphone"
}
```

**Réponse attendue :** ProductDTO mis à jour

---

### 5. Supprimer un produit
**Méthode :** `DELETE`  
**URL :** `http://localhost:8081/product/{id}`  
**Exemple :** `http://localhost:8081/product/1`

**Réponse attendue :** Status 200 (pas de contenu)

---

## 🖼️ ENDPOINTS IMAGE

### 1. Upload multiple images pour un produit
**Méthode :** `POST`  
**URL :** `http://localhost:8081/images/upload`  
**Headers :**
```
Content-Type: multipart/form-data
```

**Body (form-data) :**
- `productId` : `1` (Type: Text)
- `files` : Sélectionner plusieurs fichiers (Type: File)
  - Cliquer sur "Select Files" et choisir plusieurs images

**Réponse attendue :** Liste d'ImageDTO avec filePath

---

### 2. Créer une seule image
**Méthode :** `POST`  
**URL :** `http://localhost:8081/images`  
**Headers :**
```
Content-Type: multipart/form-data
```

**Body (form-data) :**
- `productId` : `1` (Type: Text)
- `file` : Sélectionner un fichier image (Type: File)

**Réponse attendue :** ImageDTO avec filePath

---

### 3. Récupérer toutes les images
**Méthode :** `GET`  
**URL :** `http://localhost:8081/images`

**Réponse attendue :** Liste d'ImageDTO avec filePath

---

### 4. Récupérer une image par ID
**Méthode :** `GET`  
**URL :** `http://localhost:8081/images/{id}`  
**Exemple :** `http://localhost:8081/images/1`

**Réponse attendue :** ImageDTO avec filePath

---

### 5. Récupérer les images d'un produit
**Méthode :** `GET`  
**URL :** `http://localhost:8081/images/product/{productId}`  
**Exemple :** `http://localhost:8081/images/product/1`

**Réponse attendue :** Liste d'ImageDTO pour ce produit

---

### 6. Modifier une image
**Méthode :** `PUT`  
**URL :** `http://localhost:8081/images/{id}`  
**Exemple :** `http://localhost:8081/images/1`  
**Headers :**
```
Content-Type: multipart/form-data
```

**Body (form-data) :**
- `file` : Sélectionner un nouveau fichier image (Type: File)

**Réponse attendue :** ImageDTO mis à jour

---

### 7. Supprimer une image
**Méthode :** `DELETE`  
**URL :** `http://localhost:8081/images/{id}`  
**Exemple :** `http://localhost:8081/images/1`

**Réponse attendue :** Status 204 (No Content)

---

### 8. Télécharger une image par ID (VOIR L'IMAGE VISUELLEMENT) ✨
**Méthode :** `GET`  
**URL :** `http://localhost:8081/images/download/{id}`  
**Exemple :** `http://localhost:8081/images/download/1`

**Réponse attendue :** Fichier binaire de l'image

**🎨 Comment voir l'image dans Postman :**
1. Envoyez la requête
2. Cliquez sur l'onglet **"Preview"** (en bas de la réponse) → L'image s'affichera directement !
3. Ou cliquez sur **"Send and Download"** pour télécharger l'image sur votre ordinateur

**💡 Astuce :** Pour obtenir l'ID de l'image, récupérez d'abord le produit avec `GET /product/{id}` et notez l'ID des images dans le tableau `images`.

---

### 9. Télécharger une image par nom de fichier
**Méthode :** `GET`  
**URL :** `http://localhost:8081/images/download/file/{fileName}`  
**Exemple :** `http://localhost:8081/images/download/file/550e8400-e29b-41d4-a716-446655440000.jpg`

**Réponse attendue :** Fichier binaire de l'image

**Note :** Utilisez seulement le nom du fichier (sans le préfixe `/images/download/`). Vous pouvez trouver le fileName dans le `downloadUrl` du produit.

**🎨 Pour voir l'image :** Cliquez sur l'onglet **"Preview"** après avoir envoyé la requête.

---

## 📝 EXEMPLE DE WORKFLOW COMPLET

### Étape 1 : Créer un produit
```
POST http://localhost:8081/product
Content-Type: application/json

Body (raw JSON):
{
  "name": "MacBook Pro",
  "brand": "Apple",
  "price": 2499.99,
  "inventory": 20,
  "description": "MacBook Pro 16 pouces M3 Max",
  "category": "Laptop"
}
```
**⚠️ N'oubliez pas d'inclure tous les champs, notamment `"category"` !**

**Notez l'ID retourné (ex: 1)**

### Étape 2 : Ajouter des images au produit
```
POST http://localhost:8081/images/upload
Body (form-data):
  - productId: 1
  - files: [sélectionner 2-3 images]
```

### Étape 3 : Vérifier les images du produit
```
GET http://localhost:8081/images/product/1
```

### Étape 4 : Récupérer le produit avec ses images
```
GET http://localhost:8081/product/1
```

### Étape 5 : Modifier le produit
```
PUT http://localhost:8081/product/1
Body: {
  "name": "MacBook Pro M3 Max",
  "price": 2599.99,
  "inventory": 15
}
```

### Étape 6 : Modifier une image
```
PUT http://localhost:8081/images/1
Body (form-data):
  - file: [nouvelle image]
```

### Étape 7 : Télécharger une image
```
GET http://localhost:8081/images/download/1
```

### Étape 8 : Supprimer une image
```
DELETE http://localhost:8081/images/1
```

### Étape 9 : Supprimer le produit
```
DELETE http://localhost:8081/product/1
```

---

## 🔧 CONFIGURATION POSTMAN

### Pour les requêtes multipart/form-data :
1. Sélectionner **Body** → **form-data**
2. Pour les champs texte (productId) :
   - Clé : `productId`
   - Type : **Text**
   - Valeur : `1`
3. Pour les fichiers :
   - Clé : `file` ou `files`
   - Type : **File**
   - Cliquer sur **Select Files** pour choisir l'image

### Pour les requêtes JSON :
1. Sélectionner **Body** → **raw**
2. Choisir **JSON** dans le dropdown
3. Coller le JSON dans la zone de texte

---

## ⚠️ NOTES IMPORTANTES

1. **Port :** Assurez-vous que le service tourne sur le port **8081**
2. **Base de données :** La base de données PostgreSQL doit être accessible
3. **Répertoire uploads :** Les images seront sauvegardées dans `./uploads/images` (relatif au répertoire du projet)
4. **Format d'images :** JPG, PNG, GIF, etc. sont supportés
5. **Taille des fichiers :** Par défaut, Spring Boot limite à 10MB. Pour augmenter, ajoutez dans `application.yml` :
   ```yaml
   spring:
     servlet:
       multipart:
         max-file-size: 50MB
         max-request-size: 50MB
   ```

---

## 📊 EXEMPLE DE RÉPONSE ImageDTO

```json
{
  "id": 1,
  "fileName": "product-image.jpg",
  "fileType": "image/jpeg",
  "filePath": "./uploads/images/550e8400-e29b-41d4-a716-446655440000.jpg",
  "downloadUrl": "/images/download/550e8400-e29b-41d4-a716-446655440000.jpg"
}
```

## 📊 EXEMPLE DE RÉPONSE ProductDTO

```json
{
  "id": 1,
  "name": "MacBook Pro",
  "brand": "Apple",
  "price": 2499.99,
  "inventory": 20,
  "description": "MacBook Pro 16 pouces M3 Max",
  "category": "Laptop",
  "images": [
    {
      "id": 1,
      "fileName": "macbook-front.jpg",
      "fileType": "image/jpeg",
      "filePath": "./uploads/images/550e8400-e29b-41d4-a716-446655440000.jpg",
      "downloadUrl": "/images/download/550e8400-e29b-41d4-a716-446655440000.jpg"
    }
  ]
}
```

