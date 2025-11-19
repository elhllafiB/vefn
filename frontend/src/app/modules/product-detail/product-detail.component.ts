import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product: Product | null = null;
  selectedVariants: { [key: string]: string } = {};
  selectedQuantity: number = 1;
  private subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID depuis l'URL
    const productId = this.route.snapshot.paramMap.get('id');
    
    if (productId) {
      const id = parseInt(productId, 10);
      
      // Essayer d'abord de récupérer le produit depuis le service
      this.product = this.productService.getSelectedProduct();
      
      // Si pas de produit sélectionné ou ID différent, récupérer par ID
      if (!this.product || this.product.id !== id) {
        const foundProduct = this.productService.getProductById(id);
        this.product = foundProduct || null;
      }
      
      if (this.product) {
        this.initializeVariants();
        this.addFadeInEffect();
      } else {
        // Rediriger vers la page d'accueil si produit non trouvé
        this.router.navigate(['/']);
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initializeVariants(): void {
    if (this.product?.variants) {
      this.product.variants.forEach(variant => {
        this.selectedVariants[variant.type] = variant.options[0];
      });
    }
  }

  private addFadeInEffect(): void {
    // Ajouter un effet de transition fade-in
    setTimeout(() => {
      const element = document.querySelector('.product-detail-container');
      if (element) {
        element.classList.add('fade-in');
      }
    }, 100);
  }

  selectVariant(type: string, option: string): void {
    this.selectedVariants[type] = option;
  }

  selectQuantity(quantity: number): void {
    this.selectedQuantity = quantity;
  }

  getCurrentPrice(): number {
    if (!this.product) return 0;
    return this.productService.getOfferPrice(this.product, this.selectedQuantity);
  }

  getSavings(): number {
    if (!this.product) return 0;
    return this.productService.calculateSavings(this.product);
  }

  getTotalSavings(): number {
    if (!this.product) return 0;
    const originalTotal = this.product.oldPrice * this.selectedQuantity;
    const currentTotal = this.getCurrentPrice() * this.selectedQuantity;
    return originalTotal - currentTotal;
  }

  buyNow(): void {
    // Logique pour acheter maintenant
    console.log('Acheter maintenant:', {
      product: this.product,
      variants: this.selectedVariants,
      quantity: this.selectedQuantity
    });
    // Ici vous pouvez ajouter la logique de redirection vers le checkout
  }

  addToCart(): void {
    // Logique pour ajouter au panier
    console.log('Ajouter au panier:', {
      product: this.product,
      variants: this.selectedVariants,
      quantity: this.selectedQuantity
    });
    // Ici vous pouvez ajouter la logique d'ajout au panier
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  generateStars(rating: number): string {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '★'.repeat(fullStars);
    if (hasHalfStar) stars += '☆';
    return stars;
  }
}
