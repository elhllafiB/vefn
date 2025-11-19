package org.example.cart.controller;


import jakarta.servlet.http.HttpServletRequest;
import org.example.cart.DTO.CartItemDTO;
import org.example.cart.entity.Cart;
import org.example.cart.entity.CartItem;
import org.example.cart.feign.UserClient;
import org.example.cart.model.Utilisateur;
import org.example.cart.service.CartItemService;
import org.example.cart.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequestMapping("/cart")
public class CartItemController {


    @Autowired
    private CartItemService cartItemService;
    @Autowired
    private UserClient userClient;
    @Autowired
    CartService cartService;



    @GetMapping("/item/add")
    public ResponseEntity<Object> getCart(HttpServletRequest request , @RequestParam Integer quantity , @RequestParam  Long productId) {
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
            Long cartId    = cart.getId();

            this.cartItemService.addItemToCart(cartId, productId, quantity);
            //return ResponseEntity.ok().body(Map.of("message", "added successfully"));
            cart = this.cartService.getCartByUserId(userId);
            return ResponseEntity.ok(cart);

        } catch (RuntimeException e) {
            return ResponseEntity.status(NOT_FOUND).body("not found cart with id " );

        }
    }




    @PutMapping("/item/update")
    public ResponseEntity<Object> updateItemQuantity(
            HttpServletRequest request,
            @RequestBody Map<String, Object> payload) {

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

            Long productId = Long.valueOf(payload.get("productId").toString());
            int quantity = Integer.parseInt(payload.get("quantity").toString());
            this.cartItemService.updateItemQuantity(cartId, productId, quantity);
            System.out.println("Requête reçue : productId = " + productId + ", userId = " + userId);

            return ResponseEntity.ok("Quantité mise à jour avec succès !");
        } catch (RuntimeException e) {
            return ResponseEntity.status(NOT_FOUND).body("Erreur lors de la mise à jour : " + e.getMessage());
        }
    }




//    @DeleteMapping("/Item/delete")
//    public ResponseEntity<Object> supprimerItemfromCart(HttpServletRequest request ,
//                                                        @RequestBody Long productId
//    ) {
//
//        try {
////            int userId = this.jwtService.UserId(request);
////            Cart cart = this.cartService.getCartByUserId(userId);
//
//
//
//            // 🔵 récupérer username du header envoyé par le Gateway
//            String username = request.getHeader("longInUser");
//
//            if (username == null) {
//                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                        .body("Missing username in headers");
//            }
//
//            // 🔵 appel du microservice utilisateur via Feign
//            Utilisateur user = userClient.getUserByUsername(username);
//
//            // Ici tu récupères l’ID du user depuis le MS User :
//            int userId = user.getId();
//
//            Cart cart = this.cartService.getCartByUserId(userId);
//            Long cartId    = cart.getId();
//            this.cartItemService.removeItemFromCart(cartId, productId);
//            //return ResponseEntity.ok( "deleted successfully" );
//            cart = this.cartService.getCartByUserId(userId);
//            return ResponseEntity.ok(cart);
//        } catch (RuntimeException e) {
//            return ResponseEntity.status(NOT_FOUND).body("not found cart with id " );
//        }
//    }




@DeleteMapping("/item/delete")
public ResponseEntity<Object> supprimerItemfromCart(
        HttpServletRequest request,
        @RequestBody CartItemDTO dto
) {
    try {
        String username = request.getHeader("longInUser");
        if (username == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Missing username in headers");
        }

        Utilisateur user = userClient.getUserByUsername(username);
        int userId = user.getId();

        Cart cart = this.cartService.getCartByUserId(userId);
        Long cartId = cart.getId();

        this.cartItemService.removeItemFromCart(cartId, dto.getProductId());

        cart = this.cartService.getCartByUserId(userId);
        return ResponseEntity.ok(cart);
    } catch (RuntimeException e) {
        return ResponseEntity.status(NOT_FOUND).body("not found cart with id");
    }
}





    @PutMapping("/Item")
    public ResponseEntity<Object> ProductDetail(HttpServletRequest request ,
                                                @RequestBody CartItemDTO dto
    ) {

        try {
//            int userId = this.jwtService.UserId(request);
//            Cart cart = this.cartService.getCartByUserId(userId);



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

            CartItem cartItem = this.cartItemService.getCartItem(cartId, dto.getProductId());
            System.out.println("Requête reçue : productId = " + dto.getProductId() + ", userId = " + userId);
            return ResponseEntity.ok( cartItem );

        } catch (RuntimeException e) {
            return ResponseEntity.status(NOT_FOUND).body("erreur cart with id " + e.getMessage() );
        }
    }





}
