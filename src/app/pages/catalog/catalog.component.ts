import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
import { NotificationService } from '../../services/notification.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  loading = true;
  searchTerm = '';
  sortBy = 'default';
  selectedCategory = '';
  currentPage = 1;
  itemsPerPage = 12;

  constructor(
    private apiService: ApiService,
    private cartService: CartService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.apiService.getProducts().subscribe({
      next: (data) => {
        this.products = data.products;
        this.filteredProducts = data.products;
        this.categories = [...new Set(data.products.map(p => p.category))];
        this.loading = false;
        this.notificationService.show('Productos cargados correctamente', 'success');
      },
      error: (error) => {
        console.error('Error:', error);
        this.loading = false;
        this.notificationService.show('Error al cargar productos', 'error');
      }
    });
  }

  filterProducts(): void {
    let filtered = this.products;

    if (this.searchTerm) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.selectedCategory) {
      filtered = filtered.filter(p => p.category === this.selectedCategory);
    }
    
    if (this.sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (this.sortBy === 'rating-asc') {
      filtered.sort((a, b) => a.rating - b.rating);
    } else if (this.sortBy === 'rating-desc') {
      filtered.sort((a, b) => b.rating - a.rating);
    }
    
    this.filteredProducts = filtered;
    this.currentPage = 1;
  }

  addToCart(product: Product): void {
    if (product.stock > 0) {
      this.cartService.addToCart(product);
      this.notificationService.show(`✅ ${product.title} agregado al carrito`, 'success');
    } else {
      this.notificationService.show(`❌ ${product.title} no tiene stock disponible`, 'error');
    }
  }

  get paginatedProducts(): Product[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProducts.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  changePage(page: number): void {
    this.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}