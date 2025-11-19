package org.example.userr.config;

import org.example.userr.entity.UserCredential;
import org.example.userr.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;


@Component
public class UtilisateurDetailService implements UserDetailsService {



    @Autowired
    private UserRepository Repository;

    @Override
    //une fois cette methode recuperer les information de l utilisateur de la base de donne
    //return un objet ne pas de type UserDetails , c est pourcela on a cree un autre
    //classe "UtilisateurUserDetail" qui implemente UserDetails
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserCredential> credential = Repository.findByEmail(username);
        if (credential.isPresent()) {
            return new UtilisateurUserDetail(credential.get());
        } else {
            throw new UsernameNotFoundException("User not found");
        }


    }




}
