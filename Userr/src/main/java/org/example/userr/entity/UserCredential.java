package org.example.userr.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class UserCredential {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "nom")
    private String name;

    @Column(name = "prenom")
    private String prenom;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "actif")
    private boolean actif = true;

    // Constructeurs
    public UserCredential() {
    }

    public UserCredential(int id, String name, String prenom, String email, String password, boolean actif) {
        this.id = id;
        this.name = name;
        this.prenom = prenom;
        this.email = email;
        this.password = password;
        this.actif = actif;
    }

    // Getters
    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getPrenom() {
        return prenom;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public boolean isActif() {
        return actif;
    }

    // Setters
    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setActif(boolean actif) {
        this.actif = actif;
    }

    // Méthodes utilitaires (optionnelles mais recommandées)
    @Override
    public String toString() {
        return "UserCredential{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", prenom='" + prenom + '\'' +
                ", email='" + email + '\'' +
                ", password='[PROTECTED]'" +
                ", actif=" + actif +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserCredential that = (UserCredential) o;
        return id == that.id;
    }

    @Override
    public int hashCode() {
        return Integer.hashCode(id);
    }
}