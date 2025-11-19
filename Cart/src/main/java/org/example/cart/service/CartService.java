package org.example.cart.service;

import org.example.cart.entity.Cart;
import org.example.cart.repository.CartItemRepository;
import org.example.cart.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;


@Service
public class CartService {


    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private CartItemRepository cartItemRepository;

    public Cart getCart(Long cartId) {
        Cart cart =  this.cartRepository.findById(cartId).orElseThrow(()->new RuntimeException("the cart not found"));
        BigDecimal totalAMount = cart.getTotalAmount();
        cart.setTotalAmount(totalAMount);
        return cartRepository.save(cart);

    }



    public Cart getCartByUserId(int userId) {
        return this.cartRepository.findByUserId(userId).orElseThrow(()->new RuntimeException("the cart not found"));
    }




    @Transactional
    public void clearCart(Long id) {
        Cart cart = getCart(id);
        cartItemRepository.deleteAllByCart(id);
        cart.getItems().clear();
        cart.setTotalAmount(BigDecimal.ZERO);
        cartRepository.save(cart);

    }


    public BigDecimal getTotalAmount(Long cartId) {

        Cart cart = this.getCart(cartId);
        BigDecimal total = cart.getItems().stream()
                .map(item->item.getTotalPrice())
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return total;
    }






//    public Cart createCartForUser(int userId) {
//        // Vérifier si l'utilisateur a déjà un panier
//        Cart existingCart = this.getCartByUserId(userId);
//        if (existingCart != null) {
//            return existingCart; // ou throw une exception selon votre besoin
//        }
//
//        // Créer un nouveau panier
//        Cart cart = new Cart();
//        cart.setUserId((long) userId);
//        cart.setTotalAmount(BigDecimal.ZERO);
//
//        return cartRepository.save(cart);
//    }


    public Cart createCartForUser(int userId) {
        // Vérifier si l'utilisateur a déjà un panier
        Optional<Cart> existingCartOpt = this.cartRepository.findByUserId(userId);

        if (existingCartOpt.isPresent()) {
            return existingCartOpt.get();
        }

        // Créer un nouveau panier
        Cart cart = new Cart();
        cart.setUserId((long) userId);
        cart.setTotalAmount(BigDecimal.ZERO);

        return cartRepository.save(cart);
    }





}
