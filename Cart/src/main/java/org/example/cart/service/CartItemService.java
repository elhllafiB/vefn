package org.example.cart.service;


import org.example.cart.entity.Cart;
import org.example.cart.entity.CartItem;
import org.example.cart.feign.ProductClient;
import org.example.cart.model.Product;
import org.example.cart.repository.CartItemRepository;
import org.example.cart.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.Optional;

@Service
public class CartItemService {


    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private CartService cartService;
    @Autowired
    private ProductClient productclient;





    @Transactional
    public void addItemToCart(Long cartId, Long productId, int quantity) {

        Cart cart;

        // Vérifiez si le panier existe
        boolean exists = cartRepository.existsById(cartId);

        if (exists) {
            cart = cartService.getCart(cartId);
            System.out.println("Panier trouvé: " + cart.getId());
        } else {
            System.out.println("Aucun panier trouvé avec l'ID: " + cartId);
            cart = new Cart();
            cart.setTotalAmount(BigDecimal.ZERO);
            cartRepository.save(cart);
        }

        System.out.println("ID du panier en cours: " + cart.getId());

        Product product = productclient.getById(productId);


        if (product == null) {
            System.out.println("⚠️ FEIGN CALL FAILED → aucun produit récupéré !");
        } else {
            System.out.println("Produit reçu = " + product.getName());
            System.out.println("Produit reçu = de l id est  " + product.getId());
        }


        // ⭐⭐⭐ CHANGEMENT ICI — ligne corrigée ⭐⭐⭐
        CartItem cartItem = cart.getItems()
                .stream()
                .filter(item -> productId.equals(item.getProductId()))   // ← Ligne corrigée
                .findFirst()
                .orElse(null);

        // Si l'item n'existe pas dans le panier → création
        if (cartItem == null) {
            System.out.println("entre dans if");
            cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setProductId(product.getId());
            cartItem.setQuantity(quantity);
            cartItem.setUnitPrice(product.getPrice());
        }
        // Si l'item existe → mise à jour de la quantité
        else {
            System.out.println("entre dans else");
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        }

        System.out.println("sortie du else");

        cartItem.setTotalPrice();
        cart.addItem(cartItem);

        cartItemRepository.save(cartItem);
        cartRepository.save(cart);
    }





    public boolean updateItemQuantity(Long cartId, Long productId, Integer quantity) {
        Optional<CartItem> cartItem = cartItemRepository.findByCartIdAndProductId(cartId, productId);

        if (cartItem.isPresent()) {
            CartItem item = cartItem.get();
            item.setQuantity(quantity); // Met à jour la quantité
            cartItemRepository.save(item);

            // Met à jour le total du panier
            Cart cart = item.getCart();
            cart.setTotalAmount(cart.getItems()
                    .stream()
                    .map(CartItem::getTotalPrice)
                    .reduce(BigDecimal.ZERO, BigDecimal::add));
            cartRepository.save(cart);


            return true;
        }

        return false; // Si l'élément n'est pas trouvé dans le panier
    }





    public void removeItemFromCart(Long cartId, Long productId) {

        Cart cart = cartService.getCart(cartId);
       // Product product = productService.getProductById(productId);
        Product product = productclient.getById(productId);
//        CartItem cartItem = cart.getItems().stream()
//                .filter(item->item.getProduct().getId().equals(productId))
//                .findFirst()
//                .orElseThrow(()->new RuntimeException("Item Not Found"));

        CartItem cartItem = cart.getItems()
                .stream()
                .filter(item -> productId.equals(item.getProductId()))   // ← Ligne corrigée
                .findFirst()
                .orElseThrow(()->new RuntimeException("Item Not Found"));

        cart.removeItem(cartItem);
        cartRepository.save(cart);
    }




    // ca juster pour ne pas repeter cette partie duc code dans les autre methode , on fait juste l appele
    // pas encore tester !!????
    public CartItem getCartItem(Long cartId , Long productId) {


        Cart cart = cartService.getCart(cartId);
        CartItem cartItem= cart.getItems()
                .stream()
                .sorted(Comparator.comparing(CartItem::getId).reversed())
                .filter(item -> productId.equals(item.getProductId()))
                .findFirst()
                .orElseThrow(()->new RuntimeException("Item Not Found"));
        return cartItem;
    }











}
