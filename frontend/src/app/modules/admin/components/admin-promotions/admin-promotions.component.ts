import { Component, OnInit } from '@angular/core';

interface Promotion {
  id: number;
  name: string;
  discount: string;
  validUntil: string;
  status: string;
  description?: string;
}

@Component({
  selector: 'app-admin-promotions',
  standalone: false,
  templateUrl: './admin-promotions.component.html',
  styleUrls: ['./admin-promotions.component.scss']
})
export class AdminPromotionsComponent implements OnInit {
  
  promotions: Promotion[] = [];
  filteredPromotions: Promotion[] = [];
  
  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 0;
  
  // Modal states
  showAddModal = false;
  showEditModal = false;
  
  // Form data
  selectedPromotion: Promotion | null = null;
  promotionForm: Promotion = {
    id: 0,
    name: '',
    discount: '',
    validUntil: '',
    status: 'Active',
    description: ''
  };

  constructor() {}

  ngOnInit() {
    this.loadPromotions();
    this.updatePagination();
  }

  loadPromotions() {
    this.promotions = [
      { id: 1, name: 'Réduction Été', discount: '20%', validUntil: '2024-08-31', status: 'Active', description: 'Promotion d\'été sur tous les produits' },
      { id: 2, name: 'Black Friday', discount: '50%', validUntil: '2024-11-30', status: 'Inactive', description: 'Super promo Black Friday' },
      { id: 3, name: 'Nouveaux Clients', discount: '10€', validUntil: '2024-12-31', status: 'Active', description: 'Réduction pour les nouveaux clients' },
      { id: 4, name: 'Pack Maison', discount: '15%', validUntil: '2024-09-30', status: 'Active', description: 'Pack produits maison' },
      { id: 5, name: 'Fête des Mères', discount: '25€', validUntil: '2024-05-30', status: 'Inactive', description: 'Promo spéciale Fête des Mères' }
    ];
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.promotions.length / this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.filteredPromotions = this.promotions.slice(start, end);
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

  addPromotion() {
    this.selectedPromotion = null;
    this.promotionForm = {
      id: 0,
      name: '',
      discount: '',
      validUntil: '',
      status: 'Active',
      description: ''
    };
    this.showAddModal = true;
  }

  editPromotion(promotion: Promotion) {
    this.selectedPromotion = promotion;
    this.promotionForm = { ...promotion };
    this.showEditModal = true;
  }

  deletePromotion(promotion: Promotion) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer la promotion "${promotion.name}" ?`)) {
      const index = this.promotions.findIndex(p => p.id === promotion.id);
      if (index > -1) {
        this.promotions.splice(index, 1);
        this.updatePagination();
        alert('Promotion supprimée avec succès! ✅');
      }
    }
  }

  togglePromotionStatus(promotion: Promotion) {
    promotion.status = promotion.status === 'Active' ? 'Inactive' : 'Active';
  }

  savePromotion() {
    if (this.selectedPromotion) {
      // Update existing promotion
      const index = this.promotions.findIndex(p => p.id === this.selectedPromotion!.id);
      if (index > -1) {
        this.promotions[index] = { ...this.promotionForm };
        alert('Promotion modifiée avec succès! ✅');
      }
      this.showEditModal = false;
    } else {
      // Add new promotion
      const newId = Math.max(...this.promotions.map(p => p.id)) + 1;
      this.promotionForm.id = newId;
      this.promotions.push({ ...this.promotionForm });
      alert('Promotion ajoutée avec succès! ✅');
      this.showAddModal = false;
    }
    this.updatePagination();
  }

  cancelModal() {
    this.showAddModal = false;
    this.showEditModal = false;
    this.selectedPromotion = null;
  }
}