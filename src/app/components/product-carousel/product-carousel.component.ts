import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss']
})
export class ProductCarouselComponent {
  @Input() images: string[] = [];
  @Input() thumbnail: string = '';
  currentImageIndex = 0;

  getCurrentImage(): string {
    if (this.images && this.images.length > 0) {
      return this.images[this.currentImageIndex];
    }
    return this.thumbnail;
  }

  nextImage(event: Event): void {
    event.stopPropagation();
    if (this.images && this.currentImageIndex < this.images.length - 1) {
      this.currentImageIndex++;
    }
  }

  prevImage(event: Event): void {
    event.stopPropagation();
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  hasMultipleImages(): boolean {
    return this.images && this.images.length > 1;
  }
}