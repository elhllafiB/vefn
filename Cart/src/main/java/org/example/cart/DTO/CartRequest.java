package org.example.cart.DTO;

public class CartRequest {

    private int userId;

    // Constructeur
    public CartRequest() {}

    public CartRequest(int userId) {
        this.userId = userId;
    }

    // Getters et Setters
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
