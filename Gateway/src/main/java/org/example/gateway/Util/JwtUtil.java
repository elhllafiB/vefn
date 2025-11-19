package org.example.gateway.Util;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtUtil {



    public static final String Secret = "c1f1919401fd9f125816a00c702543fd4ae2b2db7928c159e74a41b3561f6080";


    public void validateToken(final String token) {
        Jwts.parserBuilder()//Crée un parser capable de lire et de vérifier un JWT.
                .setSigningKey(getSignkey())//On fournit la clé secrète utilisée pour signer le JWT.
                .build()
                //Recalcule la signature attendue à partir du header + payload et de la clé fournie (getSignKey()).
                .parseClaimsJws(token);//Analyse le JWT et vérifie sa signature.
    }


    private Key getSignkey() {
        byte[] keyBytes = Decoders.BASE64.decode(Secret);
        return Keys.hmacShaKeyFor(keyBytes );
    }


    public String extractUsername(String token) {
        return extractClaim(token , Claims::getSubject);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
      final Claims claims = extractAllClaims(token);
      //on applique la fonction fournie sur claims.
        // Par exemple, si la fonction est Claims::getSubject, on récupérera le sujet (sub) du token.
        return claimsResolver.apply(claims) ;
    }

    //Claims est l’objet qui contient toutes les informations du JWT après vérification de sa validité.
    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()//Crée un parser JWT.
                .setSigningKey(getSignkey()) // Fournit la clé secrète pour vérifier la signature du token.
                .build()
                .parseClaimsJws(token) //Analyse le token, vérifie la signature.
                .getBody();    //Retourne le contenu du JWT, c’est-à-dire tous les claims.
    }


}
