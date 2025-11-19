import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ProductService, Product } from '../../services/product.service';

interface Category {
  name: string;
  products: Product[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories: Category[] = [];
  visibleProducts: { [key: string]: number } = {};

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.categories = this.productService.getCategories();
    // Initialiser le nombre de produits visibles pour chaque catégorie
    this.categories.forEach(category => {
      this.visibleProducts[category.name] = 4;
    });
  }

  scrollToProducts() {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
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

  goToCategoryProducts(categoryName: string) {
    // Navigation vers la page produits avec la catégorie sélectionnée
    this.router.navigate(['/products'], { 
      queryParams: { category: categoryName } 
    });
  }

  viewProduct(product: Product) {
    // Envoyer le produit au service et rediriger vers la page de détail
    this.productService.setSelectedProduct(product);
    this.router.navigate(['/product', product.id]);
  }
}
