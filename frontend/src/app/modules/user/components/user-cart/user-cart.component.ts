import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../../../../services/cart.service';

@Component({
  selector: 'app-user-cart',
  standalone: false,
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss']
})
export class UserCartComponent implements OnInit {
  
  cartItems: CartItem[] = [];

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    // S'abonner aux changements du panier
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  updateQuantity(productId: number, change: number) {
    this.cartService.updateQuantity(productId, change);
  }

  removeItem(productId: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article?')) {
      this.cartService.removeFromCart(productId);
    }
  }

  getSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  getProductDescription(item: CartItem): string {
    // Description par défaut basée sur l'image
    const descriptions: { [key: string]: string } = {
      '📱': 'Smartphone dernière génération',
      '🎧': 'Casque audio haute qualité',
      '💻': 'Ordinateur portable performant',
      '⌚': 'Montre connectée moderne',
      '📷': 'Appareil photo professionnel',
      '🖥️': 'Écran haute résolution',
      '🎮': 'Console de jeu nouvelle génération',
      '🚗': 'Voiture électrique',
      '🏠': 'Accessoire maison moderne'
    };
    return descriptions[item.image] || 'Produit de qualité';
  }

  proceedToPayment() {
    console.log('Procéder au paiement');
    // TODO: Rediriger vers la page de paiement
    alert('Fonctionnalité de paiement à implémenter');
  }

  continueShopping() {
    this.router.navigate(['/user/products']);
  }
}