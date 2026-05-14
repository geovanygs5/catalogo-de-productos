import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { NotificationService } from '../../services/notification.service';
import { CartItem } from '../../models/product.model';

@Component({
  selector: 'app-cart-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.scss']
})
export class CartSidebarComponent {
  @Output() close = new EventEmitter<void>();
  
  cartItems: CartItem[] = [];
  isOpen = false;

  constructor(
    private cartService: CartService,
    private notificationService: NotificationService
  ) {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  openCart(): void {
    this.isOpen = true;
  }

  closeCart(): void {
    this.isOpen = false;
    this.close.emit();
  }

  removeItem(productId: number): void {
    const item = this.cartItems.find(i => i.id === productId);
    this.cartService.removeFromCart(productId);
    this.notificationService.show(`❌ ${item?.title} eliminado del carrito`, 'info');
  }

  updateQuantity(productId: number, newQuantity: number): void {
    if (newQuantity > 0) {
      const item = this.cartItems.find(i => i.id === productId);
      this.cartService.updateQuantity(productId, newQuantity);
      this.notificationService.show(`📦 ${item?.title} - Cantidad: ${newQuantity}`, 'info');
    }
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  getTotalItems(): number {
    return this.cartService.getTotalItems();
  }

  clearCart(): void {
    if (confirm('¿Vaciar todo el carrito?')) {
      this.cartService.clearCart();
      this.notificationService.show('🛒 Carrito vaciado', 'info');
    }
  }

  checkout(): void {
    const total = this.getTotalPrice();
    const itemsCount = this.getTotalItems();
    
    // Esto debería mostrar la notificación
    this.notificationService.show(
      `🎉 Compra realizada! ${itemsCount} productos por $${total}`, 
      'success'
    );
    this.cartService.clearCart();
    this.closeCart();
  }
}