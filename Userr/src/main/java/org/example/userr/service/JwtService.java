package org.example.userr.service;


import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {



    public static final String Secret = "c1f1919401fd9f125816a00c702543fd4ae2b2db7928c159e74a41b3561f6080";


    public void validateToken(final String token) {
        Jwts.parserBuilder()//Crée un parser capable de lire et de vérifier un JWT.
                .setSigningKey(getSignkey())//On fournit la clé secrète utilisée pour signer le JWT.
                .build()
                //Recalcule la signature attendue à partir du header + payload et de la clé fournie (getSignKey()).
                .parseClaimsJws(token);//Analyse le JWT et vérifie sa signature.
    }



    public String generateToken( String username) {
        Map<String, Object> claims = new HashMap<>();
         // ajout de l'ID dans le token
        return createToken(claims, username);
    }





    private String createToken(Map<String, Object> claims, String username) {

        return Jwts.builder().
                setClaims(claims).
                setSubject(username).
                setIssuedAt(new Date(System.currentTimeMillis())).
                setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 30)).
                signWith(getSignkey() , SignatureAlgorithm.HS256).compact();

    }

    private Key getSignkey() {
        byte[] keyBytes = Decoders.BASE64.decode(Secret);
        return Keys.hmacShaKeyFor(keyBytes );
    }
}
