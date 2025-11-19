package org.example.userr.controller;


import org.example.userr.dto.AuthResquest;
import org.example.userr.entity.UserCredential;
import org.example.userr.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/authh/controller")
public class AuthController {


    @Autowired
    private AuthService authService;


    @Autowired
    private AuthenticationManager authenticationManager;



    @PostMapping("/addNewUser")
    public String  addNewUser(@RequestBody UserCredential user){
        return authService.saveUser(user);
    }


    @PostMapping("/token")
    public String getToken(@RequestBody AuthResquest user){

       Authentication ath =   authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

       if(ath.isAuthenticated()){
           return authService.generateToken(user.getUsername());
       }else{
           throw new RuntimeException("Authentication failed");
       }


    }

    @PostMapping("/validate")
    public String  validateToken(@RequestParam("token")String  token){

        authService.validateToken(token);
        return "success , token is valid";
    }

    @GetMapping("/bassma")
    public String hello() {
        return "hello";
    }





    @GetMapping("/find-by-username/{username}")
    public UserCredential getUserByUsername(@PathVariable String username) {
        return authService.findUserByUsername(username);
    }




}

