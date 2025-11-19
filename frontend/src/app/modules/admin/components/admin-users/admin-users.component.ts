import { Component, OnInit } from '@angular/core';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

@Component({
  selector: 'app-admin-users',
  standalone: false,
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  
  users: User[] = [];
  filteredUsers: User[] = [];
  
  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 0;
  
  // Modal states
  showAddModal = false;
  showEditModal = false;
  
  // Form data
  selectedUser: User | null = null;
  userForm = {
    id: 0,
    name: '',
    email: '',
    role: 'ROLE_USER',
    status: 'Actif'
  };

  constructor() {}

  ngOnInit() {
    this.loadUsers();
    this.updatePagination();
  }

  loadUsers() {
    // Charger les utilisateurs
    this.users = [
      { id: 1, name: 'Marie Dupont', email: 'marie@example.com', role: 'ROLE_USER', status: 'Actif' },
      { id: 2, name: 'Jean Martin', email: 'jean@example.com', role: 'ROLE_USER', status: 'Actif' },
      { id: 3, name: 'Sophie Dubois', email: 'sophie@example.com', role: 'ROLE_USER', status: 'Inactif' },
      { id: 4, name: 'Pierre Leroy', email: 'pierre@example.com', role: 'ROLE_USER', status: 'Actif' },
      { id: 5, name: 'Admin User', email: 'admin@humblehome.com', role: 'ROLE_ADMIN', status: 'Actif' },
      { id: 6, name: 'Lucie Bernard', email: 'lucie@example.com', role: 'ROLE_USER', status: 'Actif' },
      { id: 7, name: 'Thomas Petit', email: 'thomas@example.com', role: 'ROLE_USER', status: 'Inactif' },
      { id: 8, name: 'Emma Rousseau', email: 'emma@example.com', role: 'ROLE_USER', status: 'Actif' }
    ];
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.users.length / this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.filteredUsers = this.users.slice(start, end);
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

  addUser() {
    this.selectedUser = null;
    this.userForm = {
      id: 0,
      name: '',
      email: '',
      role: 'ROLE_USER',
      status: 'Actif'
    };
    this.showAddModal = true;
  }

  editUser(user: User) {
    this.selectedUser = user;
    this.userForm = { ...user };
    this.showEditModal = true;
  }

  deleteUser(user: User) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur "${user.name}" ?`)) {
      const index = this.users.findIndex(u => u.id === user.id);
      if (index > -1) {
        this.users.splice(index, 1);
        this.updatePagination();
        alert('Utilisateur supprimé avec succès! ✅');
      }
    }
  }

  toggleUserStatus(user: User) {
    user.status = user.status === 'Actif' ? 'Inactif' : 'Actif';
  }

  saveUser() {
    if (this.selectedUser) {
      // Update existing user
      const index = this.users.findIndex(u => u.id === this.selectedUser!.id);
      if (index > -1) {
        this.users[index] = { ...this.userForm };
        alert('Utilisateur modifié avec succès! ✅');
      }
      this.showEditModal = false;
    } else {
      // Add new user
      const newId = Math.max(...this.users.map(u => u.id)) + 1;
      this.userForm.id = newId;
      this.users.push({ ...this.userForm });
      alert('Utilisateur ajouté avec succès! ✅');
      this.showAddModal = false;
    }
    this.updatePagination();
  }

  cancelModal() {
    this.showAddModal = false;
    this.showEditModal = false;
    this.selectedUser = null;
  }
}