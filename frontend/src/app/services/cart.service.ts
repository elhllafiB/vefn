import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  description?: string;
  badge?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems$ = new BehaviorSubject<CartItem[]>([]);

  getCartItems(): Observable<CartItem[]> {
    return this.cartItems$.asObservable();
  }

  addToCart(product: any): void {
    const currentItems = this.cartItems$.value;
    const existingItem = currentItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const cartItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        description: product.description,
        badge: product.badge
      };
      currentItems.push(cartItem);
    }

    this.cartItems$.next(currentItems);
  }

  updateQuantity(productId: number, change: number): void {
    const currentItems = this.cartItems$.value;
    const item = currentItems.find(i => i.id === productId);

    if (item) {
      item.quantity += change;
      if (item.quantity < 1) {
        this.removeFromCart(productId);
      } else {
        this.cartItems$.next(currentItems);
      }
    }
  }

  removeFromCart(productId: number): void {
    const currentItems = this.cartItems$.value;
    const filteredItems = currentItems.filter(item => item.id !== productId);
    this.cartItems$.next(filteredItems);
  }

  clearCart(): void {
    this.cartItems$.next([]);
  }

  getTotal(): number {
    return this.cartItems$.value.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getCartItemsValue(): CartItem[] {
    return this.cartItems$.value;
  }
}
