package org.example.userr.dto;

public class AuthResquest {



    private String username;
    private String password;

    // Constructeur vide
    public AuthResquest() {
    }

    // Constructeur avec paramètres
    public AuthResquest(String username, String password) {
        this.username = username;
        this.password = password;
    }



    // Getter et Setter pour username
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    // Getter et Setter pour password
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
