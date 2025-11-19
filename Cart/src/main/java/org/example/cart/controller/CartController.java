package org.example.cart.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.example.cart.DTO.CartRequest;
import org.example.cart.entity.Cart;
import org.example.cart.entity.CartItem;
import org.example.cart.feign.UserClient;
import org.example.cart.model.Utilisateur;
import org.example.cart.repository.CartRepository;
import org.example.cart.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.NOT_FOUND;


@RestController
@RequestMapping("/cart")
public class CartController {


    @Autowired
    CartService cartService;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private UserClient userClient;


    @GetMapping("/my-cart")
    public ResponseEntity<Object> getCart(HttpServletRequest request) {
        try {

            // 🔵 récupérer username du header envoyé par le Gateway
            String username = request.getHeader("longInUser");

            if (username == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Missing username in headers");
            }

            // 🔵 appel du microservice utilisateur via Feign
            Utilisateur user = userClient.getUserByUsername(username);

            // Ici tu récupères l’ID du user depuis le MS User :
            int userId = user.getId();

            Cart cart = this.cartService.getCartByUserId(userId);

            cart.setItems(
                    cart.getItems().stream()
                            .sorted(Comparator.comparing(CartItem::getId))
                            .collect(Collectors.toSet())
            );

            return ResponseEntity.ok(cart);

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cart not found");
        }
    }


    @DeleteMapping("/delet")
    public ResponseEntity<Object> clearCart(HttpServletRequest request) {

        try {
            // 🔵 récupérer username du header envoyé par le Gateway
            String username = request.getHeader("longInUser");

            if (username == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Missing username in headers");
            }

            // 🔵 appel du microservice utilisateur via Feign
            Utilisateur user = userClient.getUserByUsername(username);

            // Ici tu récupères l’ID du user depuis le MS User :
            int userId = user.getId();

            Cart cart = this.cartService.getCartByUserId(userId);
            Long cartId = cart.getId();
            cartService.clearCart(cartId);
            return ResponseEntity.ok("cart deleted");

        } catch (RuntimeException e) {
            return ResponseEntity.status(NOT_FOUND).body("not found cart with id");
        }

    }


    @GetMapping("/cart/total-price")
    public ResponseEntity<Object> getTotalAmount(HttpServletRequest request) {
        try {
            // 🔵 récupérer username du header envoyé par le Gateway
            String username = request.getHeader("longInUser");

            if (username == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Missing username in headers");
            }

            // 🔵 appel du microservice utilisateur via Feign
            Utilisateur user = userClient.getUserByUsername(username);

            // Ici tu récupères l’ID du user depuis le MS User :
            int userId = user.getId();

            Cart cart = this.cartService.getCartByUserId(userId);
            Long cartId = cart.getId();
            BigDecimal totalPrice = cartService.getTotalAmount(cartId);
            return ResponseEntity.ok("Total Price" + totalPrice);
        } catch (RuntimeException e) {
            return ResponseEntity.status(NOT_FOUND).body("erreur");
        }


    }





    @PostMapping("/create")
    public ResponseEntity<String> createCartForUser(@RequestParam int userId) {
        try {
            Cart cart = cartService.createCartForUser(userId);
            return ResponseEntity.ok("Cart created successfully with ID: " + cart.getId());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating cart: " + e.getMessage());
        }
    }




}








