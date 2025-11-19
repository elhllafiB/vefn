import { Component, OnInit } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  discount: number;
  image: string;
  badge: string;
  rating: number;
  reviews: number;
  sales: number;
  stock: number;
  category: string;
}

@Component({
  selector: 'app-admin-products',
  standalone: false,
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  
  products: Product[] = [];
  filteredProducts: Product[] = [];
  
  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 0;
  
  // Modal states
  showAddModal = false;
  showEditModal = false;
  
  // Form data
  selectedProduct: Product | null = null;
  productForm = {
    id: 0,
    name: '',
    price: 0,
    oldPrice: 0,
    discount: 0,
    image: '',
    badge: '',
    rating: 0,
    reviews: 0,
    sales: 0,
    stock: 0,
    category: ''
  };

  constructor() {}

  ngOnInit() {
    this.loadProducts();
    this.updatePagination();
  }

  loadProducts() {
    // Charger tous les produits depuis toutes les catégories
    this.products = [
      { id: 1, name: 'Smartphone Samsung Galaxy S24', price: 899.99, oldPrice: 1099.99, discount: 18, image: '📱', badge: 'TOP VENTE', rating: 4.5, reviews: 1250, sales: 5000, stock: 45, category: 'Électronique' },
      { id: 2, name: 'Casque Bluetooth Sony WH-1000XM5', price: 349.99, oldPrice: 399.99, discount: 12, image: '🎧', badge: '', rating: 4.8, reviews: 890, sales: 3200, stock: 32, category: 'Électronique' },
      { id: 3, name: 'Aspirateur Robot Dyson V15', price: 599.99, oldPrice: 699.99, discount: 14, image: '🤖', badge: 'LIMITED OFFER', rating: 4.3, reviews: 650, sales: 1800, stock: 0, category: 'Maison' },
      { id: 4, name: 'Laptop Dell XPS 15', price: 1499.99, oldPrice: 1899.99, discount: 21, image: '💻', badge: '', rating: 4.7, reviews: 2100, sales: 8500, stock: 28, category: 'Électronique' },
      { id: 5, name: 'Montre Apple Watch Series 9', price: 449.99, oldPrice: 499.99, discount: 10, image: '⌚', badge: 'TOP VENTE', rating: 4.6, reviews: 3400, sales: 12000, stock: 15, category: 'Électronique' },
      { id: 6, name: 'Appareil Photo Canon EOS R6', price: 2499.99, oldPrice: 2799.99, discount: 11, image: '📷', badge: '', rating: 4.9, reviews: 890, sales: 2100, stock: 12, category: 'Électronique' }
    ];
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.filteredProducts = this.products.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  addProduct() {
    this.selectedProduct = null;
    this.productForm = {
      id: 0,
      name: '',
      price: 0,
      oldPrice: 0,
      discount: 0,
      image: '📱',
      badge: '',
      rating: 0,
      reviews: 0,
      sales: 0,
      stock: 0,
      category: 'Électronique'
    };
    this.showAddModal = true;
  }

  editProduct(product: Product) {
    this.selectedProduct = product;
    this.productForm = { ...product };
    this.showEditModal = true;
  }

  deleteProduct(product: Product) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer "${product.name}" ?`)) {
      const index = this.products.findIndex(p => p.id === product.id);
      if (index > -1) {
        this.products.splice(index, 1);
        this.updatePagination();
        alert('Produit supprimé avec succès! ✅');
      }
    }
  }

  saveProduct() {
    if (this.selectedProduct) {
      // Update existing product
      const index = this.products.findIndex(p => p.id === this.selectedProduct!.id);
      if (index > -1) {
        this.products[index] = { ...this.productForm };
        alert('Produit modifié avec succès! ✅');
      }
      this.showEditModal = false;
    } else {
      // Add new product
      const newId = Math.max(...this.products.map(p => p.id)) + 1;
      this.productForm.id = newId;
      this.products.push({ ...this.productForm });
      alert('Produit ajouté avec succès! ✅');
      this.showAddModal = false;
    }
    this.updatePagination();
  }

  cancelModal() {
    this.showAddModal = false;
    this.showEditModal = false;
    this.selectedProduct = null;
  }
}