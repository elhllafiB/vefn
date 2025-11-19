import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService, Category, Product } from '../../../../services/product.service';
import { CartService } from '../../../../services/cart.service';

@Component({
  selector: 'app-user-products',
  standalone: false,
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.scss']
})
export class UserProductsComponent implements OnInit {
  
  categories: Category[] = [];
  visibleProducts: { [key: string]: number } = {};

  constructor(
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    // Utiliser les données du ProductService comme dans la home page
    this.categories = this.productService.getCategories();
    
    // Initialiser le nombre de produits visibles pour chaque catégorie
    this.categories.forEach(category => {
      this.visibleProducts[category.name] = 8; // Plus de produits visibles dans l'espace user
    });
  }

  showMoreProducts(categoryName: string) {
    this.visibleProducts[categoryName] += 4;
  }

  getVisibleProducts(category: Category): Product[] {
    return category.products.slice(0, this.visibleProducts[category.name]);
  }

  hasMoreProducts(category: Category): boolean {
    return this.visibleProducts[category.name] < category.products.length;
  }

  getRemainingProducts(category: Category): number {
    return category.products.length - this.visibleProducts[category.name];
  }

  truncateName(name: string, maxLength: number = 30): string {
    return name.length > maxLength ? name.substring(0, maxLength) + '...' : name;
  }

  generateStars(rating: number): number[] {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(1); // Étoile pleine
    }
    
    if (hasHalfStar) {
      stars.push(0.5); // Demi-étoile
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(0); // Étoile vide
    }
    
    return stars;
  }

  viewProduct(product: Product) {
    // Navigation vers la page de détail
    this.router.navigate(['/product', product.id]);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    console.log('Ajouté au panier:', product);
    alert(`${product.name} ajouté au panier! 🛒`);
  }
}
