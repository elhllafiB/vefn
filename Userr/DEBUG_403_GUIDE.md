# Guide de débogage 403 Forbidden

## Test 1 : Service direct (sans Gateway)
```
POST http://localhost:8083/authh/controller/token
```

## Test 2 : Via Gateway
```
POST http://localhost:8888/authh/controller/token
```

## Vérifications à faire :

1. **Redémarrer le service** après chaque modification
2. **Vérifier les logs** pour voir d'où vient le 403
3. **Créer l'utilisateur d'abord** avec `/addNewUser`
4. **Vérifier Eureka** : le service est bien enregistré

## Si le problème persiste :

Ajouter cette configuration dans `application.properties` :
```properties
logging.level.org.springframework.security=DEBUG
logging.level.org.springframework.web=DEBUG
```

Cela affichera les détails de pourquoi Spring Security bloque la requête.

