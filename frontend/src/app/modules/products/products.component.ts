import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  selectedCategory: string = '';
  categories: string[] = ['Sacs & Housses', 'Serviettes & Peignoirs', 'Organisation & Décoration', 'Salle de Bain & Hygiène'];
  filteredProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Récupérer le paramètre de catégorie depuis l'URL
    this.route.queryParams.subscribe(params => {
      this.selectedCategory = params['category'] || '';
      this.loadProducts();
    });
  }

  loadProducts() {
    this.products = this.productService.getAllProducts();
    this.filterProducts();
  }

  filterProducts() {
    if (this.selectedCategory) {
      this.filteredProducts = this.products.filter(product => 
        product.category === this.selectedCategory
      );
    } else {
      this.filteredProducts = this.products;
    }
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.filterProducts();
    // Mettre à jour l'URL
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: category },
      queryParamsHandling: 'merge'
    });
  }

  clearFilter() {
    this.selectedCategory = '';
    this.filteredProducts = this.products;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
      queryParamsHandling: 'merge'
    });
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

  goBack() {
    this.router.navigate(['/']);
  }
}
