package org.example.userr.dto;

public class CartRequest {


    private Long userId;

    // Constructeur
    public CartRequest() {}

    public CartRequest(Long userId) {
        this.userId = userId;
    }

    // Getters et Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
