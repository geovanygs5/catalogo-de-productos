import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductCarouselComponent } from '../product-carousel/product-carousel.component';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCarouselComponent],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();

  onAddToCart(event: Event): void {
    event.stopPropagation();
    this.addToCart.emit(this.product);
  }

  getStarsArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getStockClass(): string {
    if (this.product.stock > 10) return 'in-stock';
    if (this.product.stock > 0) return 'low-stock';
    return 'out-of-stock';
  }

  getStockText(): string {
    if (this.product.stock > 10) return 'Disponible';
    if (this.product.stock > 0) return `Stock: ${this.product.stock}`;
    return 'Agotado';
  }
}